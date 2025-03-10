'use client'

import { Root as SignUpRoot, Step, Captcha, Action as SignUpAction } from '@clerk/nextjs'
import { Connection, Field, Label, Input, FieldError } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <SignUpRoot>
      <Step name="start">
        <h1>Create an account</h1>

        <Connection name="google">Sign up with Google</Connection>

        <Field name="username">
          <Label>Username</Label>
          <Input />
          <FieldError />
        </Field>

        <Field name="emailAddress">
          <Label>Email</Label>
          <Input />
          <FieldError />
        </Field>

        <Field name="password">
          <Label>Password</Label>
          <Input />
          <FieldError />
        </Field>

        <Captcha />

        <SignUpAction submit>Sign up</SignUpAction>
      </Step>
    </SignUpRoot>
  )
}
