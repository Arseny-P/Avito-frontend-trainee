import type { MenuProps } from 'antd';
import { Button, Checkbox, Divider, Flex, Menu, Switch, Typography } from 'antd';
import { useAppDispatch } from '../../store';
import { MenuSlice } from './Menu.slice';

type MenuItem = Required<MenuProps>['items'][number];
const AppMenu = () => {

    const dispatch = useAppDispatch();
    const toggleRevisions = (checked: boolean) => {
        dispatch(MenuSlice.actions.setNeedsRevision(checked))
    };

    const checkCategory = (e) => {
      if(e.target.checked){
        dispatch(MenuSlice.actions.setCategory(e.target.value))
      } else {
        dispatch(MenuSlice.actions.delCategory(e.target.value))
      }
    }

    const clearCategories = () => {
      dispatch(MenuSlice.actions.clearCategories())
    }

    const items: MenuItem[] = [
        {
            key: '1',
            label: 'Категория',
            children: [
                { key: 'auto',
                  label: (
                    <Checkbox onChange={checkCategory} value={"auto"}>Авто</Checkbox>
                  )    
                },
                { key: 'electronics',
                  label: (
                    <Checkbox onChange={checkCategory} value="electronics">Электроника</Checkbox>
                  )    
                },
                { key: 'real_estate',
                  label: (
                    <Checkbox onChange={checkCategory} value="real_estate">Недвижимость</Checkbox>
                  )    
                },
            ],
        }
    ];

  return (
    <>
        <Flex vertical>
            <Menu items={ items } mode="inline"></Menu>
            <Divider style={{ margin: 0 }} />
            <Flex align="center" justify="space-between">
              <Typography.Text>Только требующие доработок</Typography.Text>
              <Switch onChange={toggleRevisions} />
            </Flex>
        </Flex>
        
        <Button onClick={clearCategories}>Сбросить фильтры</Button>
    </>
    
  )
}

export default AppMenu