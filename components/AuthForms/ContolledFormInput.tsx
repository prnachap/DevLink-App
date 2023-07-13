"use client";

import { ForwardRefExoticComponent, RefAttributes } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";

type ControlledFormInputProps = {
  CustomInput: ForwardRefExoticComponent<Omit<any, "ref"> & RefAttributes<any>>;
  control: Control<FieldValues>;
  name: string;
};
const ContolledFormInput = ({
  CustomInput,
  control,
  name,
}: ControlledFormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <CustomInput {...field} />}
    />
  );
};

export default ContolledFormInput;
