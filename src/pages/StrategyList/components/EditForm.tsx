import {
  ModalForm,
  ProCard,
  ProForm,
  ProFormDateTimePicker,
  ProFormDependency,
  ProFormList,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button } from 'antd';
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
        id: 'pages.strategy.editForm.strategyConfig',
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
          id: 'pages.strategy.editForm.strategyName.nameLabel',
          defaultMessage: '名称',
        })}
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id="pages.strategy.editForm.strategyName.nameRules"
                defaultMessage="请输入名称！"
              />
            ),
          },
        ]}
      />
      <ProFormSelect
        name="type"
        label={intl.formatMessage({
          id: 'pages.strategy.editForm.strategyType.typeLabel',
          defaultMessage: '类型',
        })}
        valueEnum={{
          0: '实时',
          1: '定时',
        }}
      />
      <ProFormDependency name={['type']}>
        {({ type }) => {
          if (type === '0') {
            return (
              <ProFormList
                name={['price', 'times', 'min', 'max', 'count']}
                label="策略规则"
                initialValue={[
                  {
                    price: '',
                    times: '',
                    min: '',
                    max: '',
                    count: '',
                  },
                ]}
                alwaysShowItemLabel
                creatorButtonProps={{
                  creatorButtonText: '添加规则组',
                }}
                itemRender={({ listDom, action }, { record }) => {
                  console.log('listDom:', listDom);
                  return (
                    <ProCard
                      bordered
                      extra={action}
                      title={record.name}
                      style={{ marginBlockEnd: 8 }}
                    >
                      <ProForm.Group key="group">
                        <ProFormText
                          name="name"
                          label={intl.formatMessage({
                            id: 'pages.strategy.editForm.strategyName.nameLabel',
                            defaultMessage: '价格',
                          })}
                        />
                        <ProFormText
                          name="name"
                          label={intl.formatMessage({
                            id: 'pages.strategy.editForm.strategyName.nameLabel',
                            defaultMessage: '抽奖次数',
                          })}
                        />
                        <ProFormText
                          name="name"
                          label={intl.formatMessage({
                            id: 'pages.strategy.editForm.strategyName.nameLabel',
                            defaultMessage: '中奖开始区间',
                          })}
                        />
                        <ProFormText
                          name="name"
                          label={intl.formatMessage({
                            id: 'pages.strategy.editForm.strategyName.nameLabel',
                            defaultMessage: '中奖结束区间',
                          })}
                        />
                        <ProFormText
                          name="name"
                          label={intl.formatMessage({
                            id: 'pages.strategy.editForm.strategyName.nameLabel',
                            defaultMessage: '中奖次数',
                          })}
                        />
                        <Button type="primary" style={{ marginTop: '30px' }}>
                          绑定商品
                        </Button>
                      </ProForm.Group>
                    </ProCard>
                  );
                }}
              />
            );
          } else if (type === '1') {
            return (
              <>
                <ProFormText
                  name="name"
                  label={intl.formatMessage({
                    id: 'pages.strategy.editForm.strategyName.nameLabel',
                    defaultMessage: '参与数量',
                  })}
                />
                <ProFormText
                  name="name"
                  label={intl.formatMessage({
                    id: 'pages.strategy.editForm.strategyName.nameLabel',
                    defaultMessage: '中奖数量',
                  })}
                />
                <ProFormDateTimePicker
                  name="endDate"
                  label={intl.formatMessage({
                    id: 'pages.strategy.editForm.strategyName.nameLabel',
                    defaultMessage: '截止日期',
                  })}
                />
                <ProFormDateTimePicker
                  name="openDate"
                  label={intl.formatMessage({
                    id: 'pages.strategy.editForm.strategyName.nameLabel',
                    defaultMessage: '开奖日期',
                  })}
                />
                <ProFormRadio.Group
                  name="control"
                  label={intl.formatMessage({
                    id: 'pages.strategy.editForm.strategyName.nameLabel',
                    defaultMessage: '开奖控制',
                  })}
                  options={[
                    {
                      value: '1',
                      label: '开',
                    },
                    {
                      value: '0',
                      label: '关',
                    },
                  ]}
                />
                <ProFormText
                  name="name"
                  label={intl.formatMessage({
                    id: 'pages.strategy.editForm.strategyName.nameLabel',
                    defaultMessage: '中奖号码',
                  })}
                />
              </>
            );
          }
        }}
      </ProFormDependency>
    </ModalForm>
  );
};

export default EditForm;
