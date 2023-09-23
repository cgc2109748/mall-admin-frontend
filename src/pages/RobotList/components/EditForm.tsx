import {
  DrawerForm,
  ModalForm,
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormDependency,
  ProFormItem,
  ProFormList,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Form } from 'antd';
import _ from 'lodash';
import React, { useMemo } from 'react';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.RuleListItem>;

export type UpdateFormProps = {
  open: boolean;
  data: any;
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  // values: Partial<API.RuleListItem>;
  updateModalOpen: any;
};

const EditForm: React.FC<UpdateFormProps> = (props: UpdateFormProps) => {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const { open, onSubmit, onCancel, data } = props;
  const intl = useIntl();
  const isNew = useMemo(() => {
    if (_.isEmpty(data?.id)) {
      return true;
    }
    return false;
  }, [data]);
  return (
    <ModalForm
      title={intl.formatMessage({
        id: 'pages.banner.editForm.bannerConfig',
        defaultMessage: `${isNew ? '新增' : '编辑'}`,
      })}
      open={open}
      width={640}
      // destroyOnClose
      bodyStyle={{ padding: '32px 40px 48px' }}
      // footer={submitter}
      onOpenChange={(status) => {
        if (!status) {
          onCancel();
        }
      }}
      onFinish={async (values: any) => {
        console.log('values:', values);
        await onSubmit(values);
      }}
    >
      <ProFormText
        name="name"
        label={intl.formatMessage({
          id: 'pages.banner.editForm.bannerName.nameLabel',
          defaultMessage: '名称',
        })}
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id="pages.banner.editForm.bannerName.nameRules"
                defaultMessage="请输入名称！"
              />
            ),
          },
        ]}
      />
      <ProFormSelect
        name="status"
        label={intl.formatMessage({
          id: 'pages.banner.editForm.bannerStatus.statusLabel',
          defaultMessage: '等级',
        })}
        valueEnum={{
          1: '1级',
          2: '2级',
          3: '3级',
          4: '4级',
        }}
      />
      <ProFormText
        name="link"
        label={intl.formatMessage({
          id: 'pages.banner.editForm.bannerLink.linkLabel',
          defaultMessage: '初始值',
        })}
      />
      <ProFormText
        name="index"
        label={intl.formatMessage({
          id: 'pages.banner.editForm.bannerIndex.indexLabel',
          defaultMessage: '升级能力值',
        })}
      />
      <ProFormUploadDragger
        name="image"
        label={intl.formatMessage({
          id: 'pages.banner.editForm.bannerImageUpload.imageLabel',
          defaultMessage: '图片',
        })}
      />
      <ProFormSwitch
        name="status"
        label={intl.formatMessage({
          id: 'pages.banner.editForm.bannerStatus.statusLabel',
          defaultMessage: '状态',
        })}
        fieldProps={{
          checkedChildren: '启用',
          unCheckedChildren: '禁用',
        }}
      />
      <ProFormItem label="算法">
        <DrawerForm
          width={640}
          title="编辑算法"
          resize={{
            onResize() {
              console.log('resize!');
            },
            maxWidth: window.innerWidth * 0.8,
            minWidth: 640,
          }}
          form={form}
          trigger={<Button type="primary">编辑</Button>}
          autoFocusFirstInput
          drawerProps={{
            destroyOnClose: true,
          }}
          submitTimeout={2000}
          onFinish={async (values) => {
            await waitTime(2000);
            console.log(values.name);
            message.success('提交成功');
            // 不返回不会关闭弹框
            return true;
          }}
        >
          <ProForm.Group>
            <ProFormCheckbox.Group
              name="checkbox"
              label="赋能类型"
              // layout="vertical"
              options={[
                { value: '1', label: '提升概率' },
                { value: '2', label: '优惠价钱' },
                { value: '3', label: '额外奖励' },
                { value: '4', label: '开盒情况' },
              ]}
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormSelect
              options={[
                {
                  value: 'robot1',
                  label: '初级机器人',
                },
                {
                  value: 'robot 2',
                  label: '中级机器人',
                },
                {
                  value: 'robot3',
                  label: '高级机器人',
                },
              ]}
              width="xs"
              name="useMode"
              label="机器人名称"
            />
          </ProForm.Group>
          <ProFormDependency name={['checkbox']}>
            {({ checkbox }) => {
              let result = [];
              if (!_.isEmpty(checkbox)) {
                if (checkbox.indexOf('1') !== -1) {
                  result.push(
                    <ProFormList
                      name={['level', 'rate']}
                      max={1}
                      label="提升概率"
                      initialValue={[
                        {
                          level: '',
                          rate: '',
                        },
                      ]}
                      alwaysShowItemLabel
                      creatorButtonProps={{
                        creatorButtonText: '添加规则组',
                      }}
                      itemRender={({ listDom, action }, { record }) => {
                        return (
                          <ProCard
                            bordered
                            extra={action}
                            title={record.name}
                            style={{ marginBlockEnd: 8 }}
                          >
                            <ProForm.Group key="group">
                              <ProFormSelect
                                name="level"
                                label={intl.formatMessage({
                                  id: 'pages.strategy.editForm.strategyType.typeLabel',
                                  defaultMessage: '等级',
                                })}
                                valueEnum={{
                                  1: '1级',
                                  2: '2级',
                                  3: '3级',
                                  4: '4级',
                                }}
                              />
                              <ProFormText
                                name="name"
                                label={intl.formatMessage({
                                  id: 'pages.strategy.editForm.strategyName.nameLabel',
                                  defaultMessage: '提升中奖概率',
                                })}
                              />
                            </ProForm.Group>
                          </ProCard>
                        );
                      }}
                    />,
                  );
                }
                if (checkbox.indexOf('2') !== -1) {
                  result.push(
                    <ProFormList
                      name={['level', 'price']}
                      max={1}
                      label="提升优惠价钱"
                      initialValue={[
                        {
                          level: '',
                          rate: '',
                        },
                      ]}
                      alwaysShowItemLabel
                      creatorButtonProps={{
                        creatorButtonText: '添加规则组',
                      }}
                      itemRender={({ listDom, action }, { record }) => {
                        return (
                          <ProCard
                            bordered
                            extra={action}
                            title={record.name}
                            style={{ marginBlockEnd: 8 }}
                          >
                            <ProForm.Group key="group">
                              <ProFormSelect
                                name="level"
                                label={intl.formatMessage({
                                  id: 'pages.strategy.editForm.strategyType.typeLabel',
                                  defaultMessage: '等级',
                                })}
                                valueEnum={{
                                  1: '1级',
                                  2: '2级',
                                  3: '3级',
                                  4: '4级',
                                }}
                              />
                              <ProFormText
                                name="name"
                                label={intl.formatMessage({
                                  id: 'pages.strategy.editForm.strategyName.nameLabel',
                                  defaultMessage: '优惠价钱',
                                })}
                              />
                            </ProForm.Group>
                          </ProCard>
                        );
                      }}
                    />,
                  );
                }
                if (checkbox.indexOf('3') !== -1) {
                  result.push(
                    <ProFormList
                      name={['level', 'price']}
                      max={1}
                      label="额外奖励"
                      initialValue={[
                        {
                          level: '',
                          rate: '',
                        },
                      ]}
                      alwaysShowItemLabel
                      creatorButtonProps={{
                        creatorButtonText: '添加规则组',
                      }}
                      itemRender={({ listDom, action }, { record }) => {
                        return (
                          <ProCard
                            bordered
                            extra={action}
                            title={record.name}
                            style={{ marginBlockEnd: 8 }}
                          >
                            <ProForm.Group key="group">
                              <ProFormSelect
                                name="level"
                                label={intl.formatMessage({
                                  id: 'pages.strategy.editForm.strategyType.typeLabel',
                                  defaultMessage: '等级',
                                })}
                                valueEnum={{
                                  1: '1级',
                                  2: '2级',
                                  3: '3级',
                                  4: '4级',
                                }}
                              />
                              <ProFormSelect
                                name="type"
                                label={intl.formatMessage({
                                  id: 'pages.strategy.editForm.strategyType.typeLabel',
                                  defaultMessage: '额外可获得',
                                })}
                                valueEnum={{
                                  0: '奖励 1',
                                  1: '奖励 2',
                                }}
                              />
                            </ProForm.Group>
                          </ProCard>
                        );
                      }}
                    />,
                  );
                }
                // if (checkbox.indexOf('4') !== -1) {
                //   result.push(
                //     <ProFormList
                //       name={['level', 'price']}
                //       max={1}
                //       label="提升优惠价钱"
                //       initialValue={[
                //         {
                //           level: '',
                //           rate: '',
                //         },
                //       ]}
                //       alwaysShowItemLabel
                //       creatorButtonProps={{
                //         creatorButtonText: '添加规则组',
                //       }}
                //       itemRender={({ listDom, action }, { record }) => {
                //         return (
                //           <ProCard
                //             bordered
                //             extra={action}
                //             title={record.name}
                //             style={{ marginBlockEnd: 8 }}
                //           >
                //             <ProForm.Group key="group">
                //               <ProFormSelect
                //                 name="level"
                //                 label={intl.formatMessage({
                //                   id: 'pages.strategy.editForm.strategyType.typeLabel',
                //                   defaultMessage: '等级',
                //                 })}
                //                 valueEnum={{
                //                   1: '1级',
                //                   2: '2级',
                //                   3: '3级',
                //                   4: '4级',
                //                 }}
                //               />
                //               <ProFormText
                //                 name="name"
                //                 label={intl.formatMessage({
                //                   id: 'pages.strategy.editForm.strategyName.nameLabel',
                //                   defaultMessage: '优惠价钱',
                //                 })}
                //               />
                //             </ProForm.Group>
                //           </ProCard>
                //         );
                //       }}
                //     />,
                //   );
                // }
                return (
                  <>
                    {result.map((item: any) => {
                      return item;
                    })}
                  </>
                );
              }
            }}
          </ProFormDependency>
        </DrawerForm>
      </ProFormItem>
    </ModalForm>
  );
};

export default EditForm;
