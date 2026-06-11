import { Button, Card, Description, Form, Input, Label, Spinner, Surface, TextField } from '@heroui/react'
import { useBoolean, useMemoizedFn, useSetState } from 'ahooks'
import { Eye, EyeOff, KeyRound, LogIn } from 'lucide-react'
import type { FormEvent } from 'react'

import { loginWithAuthKey } from '../../auth/request'

interface LoginPanelProps {
  onLogin: () => void
}

/**
 * Karin HTTP 鉴权登录面板。
 */
const LoginPanel = ({ onLogin }: LoginPanelProps) => {
  const [formState, setFormState] = useSetState({
    authKey: '',
    loading: false,
    error: ''
  })
  const [showKey, { toggle: toggleShowKey }] = useBoolean(false)
  const iconButtonLabel = showKey ? '隐藏密钥' : '显示密钥'

  /**
   * 提交 Karin HTTP_AUTH_KEY 并换取 Karin Web token。
   */
  const handleSubmit = useMemoizedFn(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const value = formState.authKey.trim()
    if (!value) {
      setFormState({ error: '请输入 Karin HTTP 鉴权密钥' })
      return
    }

    try {
      setFormState({ loading: true, error: '' })
      await loginWithAuthKey(value)
      onLogin()
    } catch (loginError) {
      setFormState({ error: loginError instanceof Error ? loginError.message : '登录失败' })
    } finally {
      setFormState({ loading: false })
    }
  })

  return (
    <Surface className="flex min-h-screen items-center justify-center px-4 py-8">
      <Card className="w-full max-w-[420px]">
        <Card.Header className="gap-4 p-6">
          <KeyRound className="size-8 shrink-0" aria-hidden="true" />
          <div className="min-w-0">
            <Card.Title>Karin 鉴权</Card.Title>
            <Card.Description>使用 Karin HTTP 鉴权密钥登录后管理 KKK 配置。</Card.Description>
          </div>
        </Card.Header>
        <Card.Content className="p-6">
          <Form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              isInvalid={Boolean(formState.error)}
              value={formState.authKey}
              onChange={(value) => {
                setFormState({
                  authKey: value,
                  error: formState.error ? '' : formState.error
                })
              }}
            >
              <Label>HTTP 鉴权密钥</Label>
              <div className="flex items-center gap-2">
                <Input
                  autoComplete="current-password"
                  className="min-w-0 flex-1"
                  placeholder="请输入 Karin 的 HTTP_AUTH_KEY"
                  type={showKey ? 'text' : 'password'}
                />
                <Button isIconOnly aria-label={iconButtonLabel} type="button" variant="tertiary" onPress={toggleShowKey}>
                  {showKey ? <EyeOff className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}
                </Button>
              </div>
              <Description>{formState.error || '生产环境会复用 Karin 主 Web 已保存的登录凭据。'}</Description>
            </TextField>

            <Button fullWidth isPending={formState.loading} type="submit">
              {({ isPending }) => (
                <>
                  {isPending ? <Spinner color="current" size="sm" aria-label="登录中" /> : <LogIn className="size-4" aria-hidden="true" />}
                  <span>登录</span>
                </>
              )}
            </Button>
          </Form>
        </Card.Content>
      </Card>
    </Surface>
  )
}

export default LoginPanel
