 # frozen_string_literal: true

 class Posts::DocumentsController < ApplicationController
   before_action :load_post, only: [:create, :download]

   def create
     DocumentsJob.perform_async(@post.slug, download_path)
     render_notice(t("in_progress", action: "PDF generation"))
   end

   def download
     if File.exist?(download_path)
       send_file(
         download_path,
         type: "application/pdf",
         filename: pdf_file_name,
         disposition: "attachment"
       )
     else
       render_error(t("not_found", entity: "PDF"), :not_found)
     end
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
