import {
  ModalForm,
  // ProFormDateTimePicker,
  // ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
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
        id: 'pages.box.editForm.boxConfig',
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
          id: 'pages.box.editForm.boxName.nameLabel',
          defaultMessage: '名称',
        })}
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id="pages.box.editForm.boxName.nameRules"
                defaultMessage="请输入名称！"
              />
            ),
          },
        ]}
      />
      <ProFormSelect
        name="type"
        label={intl.formatMessage({
          id: 'pages.box.editForm.boxType.typeLabel',
          defaultMessage: '种类',
        })}
        valueEnum={
          {
            // 0: '下架',
            // 1: '上架',
          }
        }
      />
      <ProFormText
        name="quantity"
        label={intl.formatMessage({
          id: 'pages.box.editForm.boxQuantity.quantityLabel',
          defaultMessage: '数量',
        })}
      />
      <ProFormText
        name="price"
        label={intl.formatMessage({
          id: 'pages.box.editForm.boxPrice.priceLabel',
          defaultMessage: '价格',
        })}
      />
      <ProFormText
        name="brief"
        label={intl.formatMessage({
          id: 'pages.box.editForm.boxBrief.briefLabel',
          defaultMessage: '描述',
        })}
      />
      <ProFormUploadDragger
        name="image"
        label={intl.formatMessage({
          id: 'pages.box.editForm.boxImageUpload.imageLabel',
          defaultMessage: '图片上传',
        })}
      />
      <ProFormSelect
        name=" productIdList"
        label={intl.formatMessage({
          id: 'pages.box.editForm.boxProductIdList.productIdListLabel',
          defaultMessage: '关联商品',
        })}
        valueEnum={
          {
            // 0: '下架',
            // 1: '上架',
          }
        }
      />
    </ModalForm>
  );
};

export default EditForm;
