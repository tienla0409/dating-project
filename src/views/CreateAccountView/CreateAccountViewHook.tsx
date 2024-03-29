import { useEffect, useMemo, useState } from "react";
import { Form, UploadFile } from "antd";
import { RcFile } from "antd/es/upload";
import { useRouter } from "next/router";

import { useUploadMultiImageData } from "@/hooks/useUploadData";
import { AxiosResponseType, CreateAccountType, GenderType, ImageUploadType } from "@/types";
import { useCreateProfileData } from "@/hooks/useUsersData";
import { DATING_ROUTE } from "@/configs/routes";
import { convertToFormData } from "@/utils/upload";
import { toast } from "react-toastify";

const useCreateAccountView = () => {
  const [genderSelected, setGenderSelected] = useState<GenderType>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [openPassions, setOpenPassions] = useState(false);

  const router = useRouter();
  const [form] = Form.useForm<CreateAccountType>();

  const initForm: CreateAccountType = useMemo(
    () => ({
      firstName: "",
      lastName: "",
      birthday: undefined,
      bio: "",
      userPhotos: [],
      interestedInGender: undefined,
      passions: [],
      userGender: undefined,
    }),
    [],
  );

  const handleUploadSuccess = (res: AxiosResponseType<ImageUploadType[]>) => {
    const imageUrls = res?.data?.map((item: any) => item.url);

    const payload: CreateAccountType = {
      ...form.getFieldsValue(),
      birthday: new Date(form.getFieldValue("birthday")),
      userPhotos: imageUrls || [],
    };

    createMutate(payload);
  };

  const handleCreateSuccess = async () => {
    await router.push(DATING_ROUTE);
  };

  const handleCreateError = async (error: any) => {
    setOpenPassions(false);
    toast.error(error?.message);
  };

  const { mutate, isLoading: uploadLoading } = useUploadMultiImageData({
    onSuccess: handleUploadSuccess,
  });
  const { mutate: createMutate, isLoading: createLoading } = useCreateProfileData({
    onSuccess: handleCreateSuccess,
    onError: handleCreateError,
  });

  const isLoading = uploadLoading || createLoading;

  const formItemLayout = useMemo(
    () => ({
      labelCol: {
        span: 24,
      },
      wrapperCol: { span: 24 },
    }),
    [],
  );

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1));
  };

  const handleChangeUpload = ({ fileList: newFileList }: any) => {
    setFileList(newFileList.map((file: any) => file.originFileObj));
  };

  const handleCancelPreview = () => {
    setPreviewOpen(false);
  };

  const handleOpenPassions = () => {
    setOpenPassions(true);
  };

  const handleSubmit = () => {
    mutate(convertToFormData({ files: fileList }));
  };

  useEffect(() => {
    form.setFieldValue("gender", genderSelected);
  }, [form, genderSelected]);

  return {
    formItemLayout,
    form,
    isLoading,
    openPassions,
    setOpenPassions,
    initForm,
    genderSelected,
    setGenderSelected,
    previewOpen,
    previewTitle,
    previewImage,
    handleCancelPreview,
    handlePreview,
    handleOpenPassions,
    handleChangeUpload,
    handleSubmit,
  };
};

export default useCreateAccountView;
