import routes from "constants/routes";

import React, { useState } from "react";

import DeleteButton from "components/commons/DeleteButton";
import { useUpdatePost } from "hooks/reactQuery/usePostsApi";
import { capitalize } from "neetoCist";
import { MenuHorizontal } from "neetoIcons";
import { Dropdown, Button } from "neetoui";
import PropTypes from "prop-types";

import { getStatusLabel, toggleStatus } from "./utils";

const StatusField = ({ post }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const { Menu, MenuItem } = Dropdown;

  const { mutate: updatePost } = useUpdatePost();

  const { slug, status } = post;

  const handleUpdate = async () => {
    updatePost({
      slug,
      payload: {
        status: toggleStatus(status),
      },
    });
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex items-center justify-between">
      <div>{capitalize(status)}</div>
      <Dropdown
        buttonStyle="text"
        closeOnOutsideClick={false}
        icon={() => <MenuHorizontal size={16} />}
        isOpen={isDropdownOpen}
        position="auto"
        strategy="fixed"
        onClick={() => setIsDropdownOpen(prevState => !prevState)}
      >
        <Menu className="flex flex-col gap-2">
          <MenuItem>
            <Button
              fullWidth
              label={getStatusLabel(status)}
              style="text"
              onClick={handleUpdate}
            />
          </MenuItem>
          <MenuItem>
            <DeleteButton
              {...{ post, isDeleteAlertOpen, setIsDeleteAlertOpen }}
              redirectRoute={routes.myPosts}
            />
          </MenuItem>
        </Menu>
      </Dropdown>
    </div>
  );
};

StatusField.propTypes = {
  post: PropTypes.object.isRequired,
};

export default StatusField;
