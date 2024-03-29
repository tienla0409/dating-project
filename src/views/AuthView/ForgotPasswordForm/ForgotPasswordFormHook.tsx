import { Form } from "antd";
import { useMemo } from "react";

import { emailValidator } from "@/utils/validators";
import { ForgotPasswordFormProps } from ".";

const useForgotPasswordHook = (props: ForgotPasswordFormProps) => {
  const { setFormType } = props;

  const [form] = Form.useForm();

  const emailRules = useMemo(
    () => [{ required: true, message: "Please input your email" }, { validator: emailValidator }],
    [],
  );

  const formLayout = useMemo(
    () => ({
      labelCol: { span: 24 },
      wrapperCol: { span: 24 },
    }),
    [],
  );

  const handleSignIn = () => {
    setFormType("LoginForm");
  };

  const handleSubmit = (_values: { email: string }) => {
    // const { email } = values;
    // send login
  };

  return {
    form,
    emailRules,
    formLayout,
    handleSignIn,
    handleSubmit,
  };
};

export default useForgotPasswordHook;
