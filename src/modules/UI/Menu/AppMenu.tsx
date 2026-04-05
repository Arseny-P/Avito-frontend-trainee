import type { MenuProps } from "antd";
import {
  Button,
  Checkbox,
  Divider,
  Flex,
  Menu,
  Switch,
  Typography,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../../store";
import { PostListSlice } from "../PostsList/PostList.slice";
import { useAppColors } from "../../../services/hooks/useAppColors";

type MenuItem = Required<MenuProps>["items"][number];
const AppMenu = () => {
  const { bg } = useAppColors();
  const selectedCategories = useAppSelector((state) =>
    PostListSlice.selectors.getCategories(state),
  );
  const dispatch = useAppDispatch();
  const toggleRevisions = (checked: boolean) => {
    dispatch(PostListSlice.actions.setNeedsRevision(checked));
  };

  const checkCategory = (e) => {
    if (e.target.checked) {
      dispatch(PostListSlice.actions.setCategory(e.target.value));
    } else {
      dispatch(PostListSlice.actions.delCategory(e.target.value));
    }
  };

  const clearCategories = () => {
    dispatch(PostListSlice.actions.clearCategories());
  };

  const items: MenuItem[] = [
    {
      key: "1",
      label: "Категория",
      children: [
        {
          key: "auto",
          label: (
            <Checkbox
              onChange={checkCategory}
              value={"auto"}
              checked={selectedCategories.includes("auto")}
            >
              Авто
            </Checkbox>
          ),
        },
        {
          key: "electronics",
          label: (
            <Checkbox
              onChange={checkCategory}
              value="electronics"
              checked={selectedCategories.includes("electronics")}
            >
              Электроника
            </Checkbox>
          ),
        },
        {
          key: "real_estate",
          label: (
            <Checkbox
              onChange={checkCategory}
              value="real_estate"
              checked={selectedCategories.includes("real_estate")}
            >
              Недвижимость
            </Checkbox>
          ),
        },
      ],
    },
  ];

  return (
    <>
      <Flex vertical style={{ gap: 10 }}>
        <Flex
          vertical
          style={{ backgroundColor: bg, borderRadius: 16, padding: 16 }}
        >
          <Typography.Title level={4} style={{ margin: 0 }}>
            Фильтры
          </Typography.Title>
          <Menu items={items} mode="inline" style={{ border: "none" }}></Menu>
          <Divider style={{ margin: 0 }} />
          <Flex align="center" justify="space-between">
            <Typography.Title level={5}>
              Только требующие доработок
            </Typography.Title>
            <Switch onChange={toggleRevisions} />
          </Flex>
        </Flex>

        <Button
          onClick={clearCategories}
          style={{ border: "none", width: "100%", padding: "20px 0" }}
        >
          Сбросить фильтры
        </Button>
      </Flex>
    </>
  );
};

export default AppMenu;
