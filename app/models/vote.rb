# frozen_string_literal: true

class Vote < ApplicationRecord
  enum vote_type: { upvote: "upvote", downvote: "downvote" }

  belongs_to :post
  belongs_to :user

  validates :vote_type, presence: true, inclusion: { in: vote_types.keys }
  validates :user_id, uniqueness: { scope: :post_id }

  after_commit :update_is_bloggable, except: :destroy

  private

    def update_is_bloggable
      return if post.nil?

      is_bloggable = post.net_votes > Constants::BLOGGABLE_THRESHOLD
      if post.is_bloggable != is_bloggable
        post.update(is_bloggable:)
      end
    end
end
