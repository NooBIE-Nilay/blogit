import React, { useState } from "react";

import { Filter } from "neetoIcons";
import { Button, Pane, Typography, Input, Select } from "neetoui";
import { Form } from "neetoui/formik";
import { useTranslation } from "react-i18next";

const FilterPane = () => {
  const [isPaneOpen, setIsPaneOpen] = useState(true);

  const { t } = useTranslation();

  const { Header, Body, Footer } = Pane;

  const handleClose = () => setIsPaneOpen(false);

  return (
    <>
      <Button
        icon={() => <Filter />}
        style="text"
        onClick={() => setIsPaneOpen(true)}
      />
      <Pane isOpen={isPaneOpen} onClose={handleClose}>
        <Header>
          <Typography className="text-3xl font-bold text-slate-700">
            {t("common.filters")}
          </Typography>
        </Header>
        <Body>
          <Form className="flex w-full flex-col gap-5">
            <Input
              label={t("common.title")}
              placeHolder={t("common.titlePlaceholder")}
            />
            <Select isMulti label={t("common.category")} />
            <Select isMulti label={t("common.status")} />
          </Form>
        </Body>
        <Footer>
          <div className="flex items-center justify-start gap-2">
            <Button label={t("common.apply")} />
            <Button
              label={t("common.clearFilter")}
              style="secondary"
              onClick={handleClose}
            />
          </div>
        </Footer>
      </Pane>
    </>
  );
};

export default FilterPane;
