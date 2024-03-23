import { Form, Upload, message } from "antd";
import { Controller } from "react-hook-form";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

type TEComProfileImageUploaderProps = {
  name: string;
  label?: string;
  defaultImageUrl?: string; // Add defaultImageUrl as an optional prop
};

const EComProfileImageUploader = ({ name, label, defaultImageUrl }: TEComProfileImageUploaderProps) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(defaultImageUrl); // Initialize with defaultImageUrl

  const getBase64 = (img: any, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadButton = (
    <button
      style={{ border: 0, background: "none" }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Controller
      name={name}
      render={({ field: { onChange, ...field }, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Upload
            {...field}
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            beforeUpload={beforeUpload}
            onChange={(e) => {
              if (e.file.status === "uploading") {
                setLoading(true);
                return;
              }
              if (e.file.status === "done") {
                getBase64(e.file.originFileObj, (url) => {
                  setLoading(false);
                  setImageUrl(url);
                });
              }
              onChange(e.file);
            }}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{ width: "100%" }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default EComProfileImageUploader;
