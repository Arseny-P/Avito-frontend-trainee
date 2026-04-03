import { ExclamationCircleFilled } from "@ant-design/icons"
import { Card, Flex, Typography } from "antd"

/*
<Tag 
                color="warning" 
                style={{ 
                  width: 'fit-content',
                  borderRadius: 8, 
                  padding: '2px 8px', 
                  lineHeight: "22px",
                  border: 'none',
                  backgroundColor: '#fdf2e9',
                  color: '#d48806',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <span style={{ 
                  width: 6, 
                  height: 6, 
                  backgroundColor: '#d48806', 
                  borderRadius: '50%' 
                }} />
                Требует доработок
              </Tag>
*/

const MissingSpecsCard = ({missingSpecs}: {missingSpecs: string[]}) => {
  return (
    <Card styles={{ root: {backgroundColor: '#fdf2e9', padding: "12px 16px", borderRadius: 8, boxShadow: "0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12)"}, body: { padding: 0 } }}>
        <Card.Meta
            avatar={<ExclamationCircleFilled style={{color: '#d48806', fontSize: 18}}/>} 
            title={<Typography.Text style={{fontSize: 16}} strong>Требует доработок</Typography.Text>}
            description={
                <Flex vertical>
                    <Typography.Text style={{margin: 0}}>У объявления не заполнены поля:</Typography.Text>
                    <ul style={{margin: 0}}>
                        {
                            missingSpecs.map((item: string, index: number) => 
                                <li key={index}><Typography.Text>{item}</Typography.Text></li>
                            )
                        }
                    </ul>
                </Flex>
            }
        />
    </Card>
  )
}

export default MissingSpecsCard