import { ModalForm, ProFormText, ProFormUploadDragger } from '@ant-design/pro-components';
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
        id: 'pages.product.editForm.bannerConfig',
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
          id: 'pages.product.editForm.productName.nameLabel',
          defaultMessage: '名称',
        })}
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id="pages.product.editForm.productName.nameRules"
                defaultMessage="请输入名称！"
              />
            ),
          },
        ]}
      />
      <ProFormText
        name="link"
        label={intl.formatMessage({
          id: 'pages.product.editForm.bannerLink.linkLabel',
          defaultMessage: '分类',
        })}
      />
      <ProFormText
        name="index"
        label={intl.formatMessage({
          id: 'pages.product.editForm.bannerIndex.indexLabel',
          defaultMessage: '数量',
        })}
      />
      <ProFormText
        name="index"
        label={intl.formatMessage({
          id: 'pages.product.editForm.bannerIndex.indexLabel',
          defaultMessage: '价格',
        })}
      />
      <ProFormText
        name="index"
        label={intl.formatMessage({
          id: 'pages.product.editForm.bannerIndex.indexLabel',
          defaultMessage: '优惠价格',
        })}
      />
      <ProFormText
        name="index"
        label={intl.formatMessage({
          id: 'pages.product.editForm.bannerIndex.indexLabel',
          defaultMessage: '描述',
        })}
      />
      {/*<ProFormSelect*/}
      {/*  name='status'*/}
      {/*  label={intl.formatMessage({*/}
      {/*    id: 'pages.product.editForm.bannerStatus.statusLabel',*/}
      {/*    defaultMessage: '状态',*/}
      {/*  })}*/}
      {/*  valueEnum={{*/}
      {/*    0: '下架',*/}
      {/*    1: '上架',*/}
      {/*  }}*/}
      {/*/>*/}
      <ProFormUploadDragger
        name="image"
        label={intl.formatMessage({
          id: 'pages.product.editForm.bannerImageUpload.imageLabel',
          defaultMessage: '缩略图',
        })}
      />
      <ProFormUploadDragger
        name="image"
        label={intl.formatMessage({
          id: 'pages.product.editForm.bannerImageUpload.imageLabel',
          defaultMessage: '详情图',
        })}
      />
    </ModalForm>
  );
};

export default EditForm;
