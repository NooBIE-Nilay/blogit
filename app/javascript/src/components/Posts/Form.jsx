import React from "react";

import { Input, Button } from "components/commons";

const Form = ({
  type = "create",
  title,
  setTitle,
  description,
  setDescription,
  loading,
  handleSubmit,
}) => (
  <form className="mb-4 w-full space-y-2" onSubmit={handleSubmit}>
    <Input
      label="Title"
      placeholder="Blog Title (Max 50 Characters Allowed)"
      value={title}
      onChange={e => setTitle(e.target.value.slice(0, 50))}
    />
    <Input
      label="Description"
      placeholder="Blog Description (Max 10000 Characters Allowed)"
      value={description}
      onChange={e => setDescription(e.target.value.slice(0, 50))}
    />
    <Button
      buttonText={type === "create" ? "Create Post" : "Update Post"}
      loading={loading}
      type="submit"
    />
  </form>
);

export default Form;
