import { toast } from "react-toastify";
import { useMemo } from "react";
import { Form } from "antd";
import { useRouter } from "next/router";

import { LoginFormProps } from ".";
import { useLoginData } from "@/hooks/useAuthData";
import { DATING_ROUTE } from "@/configs/routes";
import { AuthType, AxiosResponseType, SignInType } from "@/types";
import { emailValidator, passwordValidator } from "@/utils/validators";
import { FormType } from "..";
import useStore from "@/store";

const useLoginForm = (props: LoginFormProps) => {
  const { setFormType } = props;

  const [form] = Form.useForm();
  const router = useRouter();
  const store = useStore();

  const handleSuccess = async (res: AxiosResponseType<AuthType>) => {
    toast.success(res.message);
    await router.push(DATING_ROUTE);
  };

  const handleError = (error: any) => {
    toast.error(error?.message);
  };

  const { mutate, isLoading } = useLoginData({
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const emailRules = useMemo(
    () => [{ required: true, message: "Please input your email" }, { validator: emailValidator }],
    [],
  );

  const passwordRules = useMemo(
    () => [
      { required: true, message: "Please input your password" },
      { validator: passwordValidator },
    ],
    [],
  );

  const formLayout = useMemo(
    () => ({
      labelCol: { span: 24 },
      wrapperCol: { span: 24 },
    }),
    [],
  );

  const handleRedirect = (type: FormType) => () => {
    setFormType(type);
  };

  const handleSubmit = async (payload: SignInType) => {
    mutate(payload);
  };
  return {
    isLoading,
    form,
    emailRules,
    passwordRules,
    formLayout,
    handleRedirect,
    handleSubmit,
  };
};

export default useLoginForm;
