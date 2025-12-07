import routes from "constants/routes";

import React, { useState, useEffect, useRef } from "react";

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

  const dropdownRef = useRef(null);

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

  useEffect(() => {
    const handleOutsideClick = event => {
      if (!isDropdownOpen || isDeleteAlertOpen) return;
      const { target } = event;

      const clickedOutsideDropdown =
        dropdownRef.current && !dropdownRef.current.contains(target);

      if (clickedOutsideDropdown) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isDropdownOpen, dropdownRef, isDeleteAlertOpen]);

  return (
    <div className="flex items-center justify-between">
      <div>{capitalize(status)}</div>
      <div ref={dropdownRef}>
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
    </div>
  );
};

StatusField.propTypes = {
  post: PropTypes.object.isRequired,
};

export default StatusField;
