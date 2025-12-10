# frozen_string_literal: true

class DocumentsJob
  include Sidekiq::Job

  def perform(post_slug, user_id)
    ActionCable.server.broadcast(user_id, { message: I18n.t("document.render"), progress: 25 })
    post = Post.find_by!(slug: post_slug)

    html_document = ApplicationController.render(
      assigns: { post: },
      template: "posts/document/download",
      layout: "pdf"
    )
    ActionCable.server.broadcast(user_id, { message: I18n.t("document.generate"), progress: 50 })

    pdf_blob = WickedPdf.new.pdf_from_string html_document

    current_user = User.find(user_id)
    ActionCable.server.broadcast(user_id, { message: I18n.t("document.upload"), progress: 75 })
    if current_user.document.attached?
      current_user.document.purge_later
    end
    current_user.document.attach(
      io: StringIO.new(pdf_blob), filename: "document.pdf", content_type: "application/pdf")
    current_user.save
    ActionCable.server.broadcast(user_id, { message: I18n.t("document.attach"), progress: 100 })
  end
end
