import React from "react";

import { Input, Textarea, Button } from "@bigbinary/neetoui";
import { useHistory } from "react-router-dom";

const Form = ({
  type = "create",
  title = "",
  setTitle,
  description = "",
  setDescription,
  loading,
  handleSubmit,
}) => {
  const history = useHistory();

  return (
    <form className="mb-4 w-full" onSubmit={handleSubmit}>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="space-y-4">
          <Input
            placeholder="Enter title"
            value={title}
            label={
              <span>
                Title<span className="text-red-600">*</span>
              </span>
            }
            onChange={e => setTitle(e.target.value.slice(0, 50))}
          />
          <div>
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-800">
                Description<span className="text-red-600">*</span>
              </div>
              <div className="text-xs text-gray-500">
                {description.length}/10000
              </div>
            </div>
            <div className="mt-1">
              <Textarea
                required
                placeholder="Enter description"
                rows={8}
                value={description}
                onChange={e => setDescription(e.target.value.slice(0, 10000))}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-x-3 gap-y-2 sm:flex-row sm:justify-end">
          <div className="w-full sm:w-auto">
            <Button
              className="w-full sm:w-auto"
              label="Cancel"
              style="secondary"
              type="button"
              onClick={() => history.push("/dashboard")}
            />
          </div>
          <div className="w-full sm:w-auto">
            <Button
              className="w-full sm:w-auto"
              label={type === "create" ? "Submit" : "Update"}
              loading={loading}
              style="primary"
              type="submit"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
