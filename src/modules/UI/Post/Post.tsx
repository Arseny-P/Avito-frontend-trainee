import type { PostType } from "@/services/types/Post.type";
import { Card, Flex, Tag, Typography } from "antd";
import { PictureOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import { PostListSlice } from "../PostsList/postFilters.slice";
import { useAppSelector } from "@/store";
import { useAppColors } from "@/services/hooks/useAppColors";

const Post = ({ id, category, title, price, needsRevision }: PostType) => {
  const { bgGold, textGold, bgNeutral, bgPlaceholder, bg } = useAppColors();
  const getCategory = () => {
    switch (category) {
      case "auto":
        return "Авто";
      case "real_estate":
        return "Недвижимость";
      case "electronics":
        return "Электроника";
    }
  };

  return (
    <Link to={`/ads/${id}`}>
      {useAppSelector((state) => PostListSlice.selectors.getVision(state)) ===
      "list" ? (
        <Card
          hoverable
          style={{ width: "100%", borderRadius: 24, overflow: "hidden" }}
          styles={{ body: { padding: 0, height: "100%" } }}
        >
          <Flex style={{ height: "100%" }} align="stretch">
            <div
              style={{
                width: 180,
                backgroundColor: bgPlaceholder,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <PictureOutlined style={{ fontSize: 64, color: "#bfbfbf" }} />
            </div>
            <Flex vertical style={{ gap: 4, padding: "16px 24px" }}>
              <Tag
                style={{
                  color: "#848388",
                  fontWeight: 400,
                  padding: 0,
                  margin: 0,
                  background: "none",
                }}
              >
                {getCategory()}
              </Tag>
              <Typography.Title
                level={5}
                style={{ marginBlock: 0, flexShrink: 0 }}
                ellipsis={true}
              >
                {title}
              </Typography.Title>
              <Typography.Text strong>{price} ₽</Typography.Text>
              {needsRevision && (
                <Tag
                  color="warning"
                  style={{
                    width: "fit-content",
                    borderRadius: 8,
                    padding: "2px 8px",
                    lineHeight: "22px",
                    border: "none",
                    backgroundColor: bgGold,
                    color: textGold,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      backgroundColor: textGold,
                      borderRadius: "50%",
                    }}
                  />
                  Требует доработок
                </Tag>
              )}
            </Flex>
          </Flex>
        </Card>
      ) : (
        <Card
          hoverable
          style={{
            width: 200,
            height: 268,
            borderRadius: 24,
            overflow: "hidden",
          }}
          cover={
            <div
              style={{
                height: 150,
                backgroundColor: bgPlaceholder,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <PictureOutlined style={{ fontSize: 64, color: "#bfbfbf" }} />
              <Tag
                style={{
                  position: "absolute",
                  bottom: -12,
                  left: 12,
                  width: "fit-content",
                  borderRadius: 8,
                  padding: "2px 12px",
                  margin: 0,
                  backgroundColor: bg,
                  border: `1px solid ${bgNeutral}`,
                  zIndex: 1,
                }}
              >
                {getCategory()}
              </Tag>
            </div>
          }
          styles={{ body: { padding: "16px" } }}
        >
          <Flex vertical>
            <Typography.Title level={5} style={{ margin: 0 }} ellipsis={true}>
              {title}
            </Typography.Title>
            <Typography.Text strong>{price} ₽</Typography.Text>
            {needsRevision && (
              <Tag
                color="warning"
                style={{
                  width: "fit-content",
                  borderRadius: 8,
                  padding: "2px 8px",
                  lineHeight: "22px",
                  border: "none",
                  backgroundColor: bgGold,
                  color: textGold,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    backgroundColor: textGold,
                    borderRadius: "50%",
                  }}
                />
                Требует доработок
              </Tag>
            )}
          </Flex>
        </Card>
      )}
    </Link>
  );
};

export default Post;
