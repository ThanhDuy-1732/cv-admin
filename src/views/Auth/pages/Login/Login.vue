<template>
  <div class="login d-flex align-center flex-column ga-3">
    <div class="text-h3 text-black">Login</div>

    <a-form
      ref="formRef"
      :rules="rules"
      :model="formState"
      class="login__form d-flex flex-column ga-3"
      
      @finish="handleFormSubmit"
      @finishFailed="handleFormSubmitFailed"
    >
      <form-item class="form__item" has-feedback name="username">
        <a-input v-model:value="formState.username" placeholder="Username">
          <template #prefix><UserOutlined class="item__icon" /></template>
        </a-input>
      </form-item>
      <form-item class="form__item" has-feedback name="password">
        <input-password v-model:value="formState.password" type="password" placeholder="Password">
          <template #prefix><LockOutlined class="item__icon" /></template>
        </input-password>
      </form-item>

      <form-item class="form__item d-flex justify-end">
        <a-button class="item__button item__button--forgot-password" type='text'>Forgot password</a-button>
      </form-item>

      <form-item class="form__item">
        <a-button
          size="large"
          type="primary"
          html-type="submit"
          class="item__button w-50"
        >
          Login
        </a-button>
        <div class="item__child">
          <span class="text-subtitle-1">Or</span>
          <a-button html-type="button" type="link" class="text-subtitle-1 item__button item__button--register">register now!</a-button>
        </div>
      </form-item>
    </a-form>

    <div class="login__more d-flex ga-3">
      <a-button 
        size="large"
        type="primary" 
        :icon="h(BrandGoogleIcon)"
        class="more__button d-flex align-center justify-center ga-2" 
      >
        Google
      </a-button>
      <a-button 
        size="large" 
        type="primary" 
        :icon="h(BrandFacebookIcon)"
        class="more__button d-flex align-center justify-center ga-2" 
      >
        Facebook
      </a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  //  Utilities
  import * as Yup from 'yup';
  import CryptoJS from 'crypto-js';
  import { useRouter } from 'vue-router';
  import { h, ref, reactive, computed } from 'vue';

  // Components
  import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
  import { BrandGoogleIcon, BrandFacebookIcon } from 'vue-tabler-icons';
  import { Form as AForm, FormItem, Input as AInput, InputPassword, Button as AButton, FormProps } from 'ant-design-vue';

  // Stores
  import { useAuthStore } from '@/store/auth.store';
  
  // Types
  import type { FormInstance, Rule } from 'ant-design-vue/es/form';
  export type LoginFormValue = {
    username: string,
    password: string,
  };

  const router = useRouter();

  const authStore = useAuthStore();

  const formRef = ref<FormInstance | null>(null);

  const formState = reactive<LoginFormValue>({
    username: '',
    password: ''
  })

  const handleFormSubmit: FormProps['onFinish'] = async () => {
    const password = CryptoJS.AES.encrypt(formState.password, formState.username).toString();

    await authStore.login({
      password,
      username: formState.username,
    });

    router.push({ name: 'Home' });
  };

  const handleFormSubmitFailed: FormProps['onFinishFailed'] = errors => {
    console.log('errors', errors);
  };

  const usernameValidator = async (_rule: Rule, value: string): Promise<void> => {
    await Yup.object({
      username: Yup.string().required('Username is required').min(3, 'Username has at least 3 characters'),
    }).validate({
      username: value,
    });
  };

  const passwordValidator = async (_rule: Rule, value: string): Promise<void> => {
    await Yup.object({
      password: Yup.string().required('Password is required').matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      "Password must contain 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special case character"
    )
    }).validate({
      password: value
    })
  }

  const rules = computed<Record<string, Rule[]>>(() => ({
    username: [{ validator: usernameValidator, trigger: 'change'}],
    password: [{ validator: passwordValidator, trigger: 'change' }]
  }));
</script>

<style lang="scss" scoped>
  @import './Login.scss';
  @import '@/styles/common.scss';
</style>