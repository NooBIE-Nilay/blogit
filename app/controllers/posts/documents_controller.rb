 # frozen_string_literal: true

 class Posts::DocumentsController < ApplicationController
   before_action :load_post, only: [:create, :download]

   def create
     DocumentsJob.perform_async(@post.slug, @current_user.id)
   end

   def download
     unless @current_user.document.attached?
       render_error(t("not_found", entity: "Document"), :not_found) and return
     end

     send_data @current_user.document.download, filename: pdf_file_name, content_type: "application/pdf"
   end

   private

     def load_post
       @post = Post.find_by!(slug: params[:post_slug])
     end

     def download_path
       @_download_path ||= Rails.root.join("tmp/#{pdf_file_name}").to_s
     end

     def pdf_file_name
       "post_#{@post.slug}.pdf"
     end
 end
