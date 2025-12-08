import React, { useState } from "react";

import { useVotePost } from "hooks/reactQuery/usePostsApi";
import { DownArrow, UpArrow } from "neetoIcons";
import { Button, Typography } from "neetoui";

import { VOTE_TYPES } from "./constants";

const VoteAction = ({ slug, voteCount = 0, voteType }) => {
  const [type, setType] = useState(voteType);
  const { mutate: votePost } = useVotePost();

  const vote = type => {
    votePost({
      slug,
      voteType: type,
    });
  };

  const handleVote = voteType => {
    setType(prevType => (prevType === voteType ? null : voteType));
    vote(voteType);
  };

  return (
    <div
      className="flex flex-col items-center space-y-2"
      onClick={event => event.stopPropagation()}
    >
      <Button
        style="text"
        icon={() => (
          <UpArrow color={type === VOTE_TYPES.UPVOTE ? "green" : "black"} />
        )}
        onClick={() => handleVote(VOTE_TYPES.UPVOTE)}
      />
      <Typography className="font-bold text-slate-600" style="h3">
        {voteCount}
      </Typography>
      <Button
        style="text"
        icon={() => (
          <DownArrow color={type === VOTE_TYPES.DOWNVOTE ? "red" : "black"} />
        )}
        onClick={() => handleVote(VOTE_TYPES.DOWNVOTE)}
      />
    </div>
  );
};

export default VoteAction;
