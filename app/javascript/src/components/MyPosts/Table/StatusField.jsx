import routes from "constants/routes";

import React, { useState, useEffect, useRef } from "react";

import DeleteButton from "components/commons/DeleteButton";
import { useUpdatePost } from "hooks/reactQuery/usePostsApi";
import { t } from "i18next";
import Logger from "js-logger";
import { capitalize } from "neetoCist";
import { MenuHorizontal } from "neetoIcons";
import { Dropdown, Button } from "neetoui";
import PropTypes from "prop-types";

const StatusField = ({ post }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const dropdownRef = useRef(null);

  const { Menu, MenuItem } = Dropdown;

  const updateLabel =
    post.status === "published"
      ? t("status.update.unpublish")
      : t("status.update.publish");

  const { mutate: updatePost } = useUpdatePost({
    onError: error => {
      Logger.error(error);
    },
  });

  const handleUpdate = async event => {
    event.preventDefault();
    updatePost({
      slug: post.slug,
      payload: {
        status: post.status === "published" ? "draft" : "published",
      },
    });
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = event => {
      if (!isDropdownOpen || isDeleteAlertOpen) return;
      const target = event.target;

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
      <div>{capitalize(post.status)}</div>
      <div ref={dropdownRef}>
        <Dropdown
          buttonStyle="text"
          closeOnOutsideClick={false}
          icon={() => <MenuHorizontal size={16} />}
          isOpen={isDropdownOpen}
          onClick={() => setIsDropdownOpen(prevState => !prevState)}
        >
          <Menu className="flex flex-col gap-2">
            <MenuItem>
              <Button
                fullWidth
                label={updateLabel}
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
