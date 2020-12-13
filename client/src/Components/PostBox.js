import React, { useEffect, useState } from "react";
import { Button, Card, Col, Input, Row, Form, Upload } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { postSubmitAction } from "../Redux/actions/postAction";
import { getPublicPostsAction } from "../Redux/actions/postAction";
import Loader from "./Loader";

const PostBox = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const postSubmit = useSelector((state) => state.postSubmit);
  const { success } = postSubmit;

  const [uploading, setUploading] = useState(false);
  const [postImage, setPostImage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getPublicPostsAction());
  }, [dispatch, success]);

  const submitHandler = (values) => {
    dispatch(
      postSubmitAction({
        caption: values.caption,
        image: postImage,
      })
    );
    form.resetFields();
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/upload", formData, config);

      setPostImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Card
      bordered={true}
      style={{
        width: "100%",
        borderRadius: "10px",
        marginBottom: "10px",
        boxShadow: "rgb(191 191 191) 0px 1px 1px",
      }}
    >
      <Row>
        <Col span={24}>
          <Form form={form} style={{ width: "100%" }} onFinish={submitHandler}>
            <Form.Item name="caption">
              <Input size="large" placeholder="Whats on your mind?" />
            </Form.Item>
            <div className="postactions">
              <div className="postactions_btns">
                <Form.Item
                  style={{ marginBottom: 0 }}
                  name="image"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  onChange={uploadFileHandler}
                >
                  <Upload>
                    <Button
                      listtype="picture"
                      icon={<FileImageOutlined />}
                    ></Button>
                  </Upload>
                </Form.Item>
                {uploading && <Loader small ind />}
              </div>
              <div className="post_btn">
                <Button htmlType="submit" type="primary">
                  POST
                </Button>
              </div>
            </div>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};

export default PostBox;
