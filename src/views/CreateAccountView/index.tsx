import { Button, Col, DatePicker, Form, Input, Modal, Row, Upload } from "antd";
import Image from "next/image";
import classNames from "classnames/bind";
import { PlusOutlined } from "@ant-design/icons";

import styles from "./CreateAccountView.module.scss";
import { GenderSelect, PassionsSelect } from "@/components";
import {
  birthdayValidator,
  firstNameValidator,
  genderValidator,
  lastNameValidator,
  lookingForGenderValidate,
  userPhotosValidator,
} from "@/utils/validators";
import useCreateAccountView from "./CreateAccountViewHook";

const cln = classNames.bind(styles);

const CreateAccountView = () => {
  const {
    formItemLayout,
    form,
    isLoading,
    openPassions,
    setOpenPassions,
    initForm,
    previewOpen,
    previewTitle,
    previewImage,
    handleCancelPreview,
    handlePreview,
    handleOpenPassions,
    handleChangeUpload,
    handleSubmit,
  } = useCreateAccountView();

  return (
    <div className={cln("container", "wrapper")}>
      <h1 className={cln("title")}>Create account</h1>

      <Form
        name="createAccount"
        {...formItemLayout}
        form={form}
        initialValues={initForm}
        onFinish={handleOpenPassions}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="First Name"
              name="firstName"
              required
              rules={[{ validator: firstNameValidator }]}
            >
              <Input size="large" placeholder="Enter your first name" maxLength={20} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Last Name"
              name="lastName"
              required
              rules={[{ validator: lastNameValidator }]}
            >
              <Input size="large" placeholder="Enter your last name" maxLength={15} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Birthday"
              name="birthday"
              required
              rules={[{ validator: birthdayValidator }]}
            >
              <DatePicker
                format={"DD/MM/YYYY"}
                size="large"
                style={{ width: "100%" }}
                placeholder="Enter your birthday"
                // disabledDate={(current) =>
                //   current &&
                //   new Date(current.valueOf()) >
                //     new Date(new Date().setFullYear(new Date().getFullYear() - 18))
                // }
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Gender"
              name="userGender"
              required
              rules={[{ validator: genderValidator }]}
            >
              <GenderSelect form={form} field="userGender" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Looking for"
              name="interestedInGender"
              required
              rules={[{ validator: lookingForGenderValidate }]}
            >
              <GenderSelect form={form} field="interestedInGender" interestedInGender />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Profile images"
          name="userPhotos"
          required
          rules={[{ validator: userPhotosValidator }]}
        >
          <Upload
            listType="picture-card"
            multiple
            maxCount={6}
            onChange={handleChangeUpload}
            onPreview={handlePreview}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancelPreview}
          width={700}
        >
          <Image
            src={previewImage}
            alt={previewTitle}
            objectFit="cover"
            layout="responsive"
            width={700}
            height={700}
          />
        </Modal>

        <Form.Item label="Bio" name="bio">
          <Input.TextArea
            rows={6}
            showCount
            maxLength={1000}
            placeholder="Enter your bio"
            size="large"
          />
        </Form.Item>

        <Form.Item name="passions">
          <PassionsSelect
            form={form}
            field="passions"
            open={openPassions}
            setOpen={setOpenPassions}
            loading={isLoading}
            handleSubmit={handleSubmit}
          />
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" size="large" htmlType="submit" shape="round">
            <span className={cln("sign__up-text")}>Continue</span>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateAccountView;
