import { useEffect, useRef } from 'react'
import { Input, Button, Spinner, Divider, addToast } from '@heroui/react'
import gsap from 'gsap'
import { useGeetest4 } from './useGeetest4'

interface Geetest4PanelProps {
  initialCaptchaId?: string
}

export function Geetest4Panel({ initialCaptchaId }: Geetest4PanelProps) {
  const resultRef = useRef<HTMLDivElement>(null)
  const {
    captchaId,
    result,
    isLoading,
    isSuccess,
    setCaptchaId,
    handleGenerate,
    handleCopyResult,
    handleReset,
  } = useGeetest4()

  useEffect(() => {
    if (initialCaptchaId) setCaptchaId(initialCaptchaId)
  }, [initialCaptchaId, setCaptchaId])

  useEffect(() => {
    if (result) {
      const text = `lot_number=${result.lot_number}&captcha_output=${result.captcha_output}&pass_token=${result.pass_token}&gen_time=${result.gen_time}`
      navigator.clipboard.writeText(text).then(
        () => addToast({ title: '已自动复制到剪贴板', color: 'success' }),
        () => {}
      )

      if (resultRef.current) {
        gsap.fromTo(
          resultRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
        )
      }
    }
  }, [result])

  return (
    <div className="flex flex-col gap-5">
      <Input
        label="CAPTCHA_ID"
        placeholder="请输入 captcha_id"
        value={captchaId}
        onValueChange={setCaptchaId}
        variant="bordered"
        labelPlacement="outside"
      />

      {isLoading ? (
        <div className="h-10 bg-default-100 rounded-medium flex items-center justify-center">
          <Spinner size="sm" />
        </div>
      ) : isSuccess ? (
        <Button color="success" className="w-full" onPress={handleReset}>
          验证成功（点击重置）
        </Button>
      ) : (
        <Button color="primary" className="w-full" onPress={handleGenerate}>
          生成验证码
        </Button>
      )}

      {result && (
        <div ref={resultRef}>
          <Divider className="my-3" />
          <div className="flex flex-col gap-4">
            <p className="text-center text-sm font-medium text-foreground">验证结果</p>

            <Input
              label="LOT_NUMBER"
              value={result.lot_number}
              isReadOnly
              variant="bordered"
              labelPlacement="outside"
              classNames={{ input: 'font-mono' }}
            />

            <Input
              label="CAPTCHA_OUTPUT"
              value={result.captcha_output}
              isReadOnly
              variant="bordered"
              labelPlacement="outside"
              classNames={{ input: 'font-mono text-xs' }}
            />

            <Input
              label="PASS_TOKEN"
              value={result.pass_token}
              isReadOnly
              variant="bordered"
              labelPlacement="outside"
              classNames={{ input: 'font-mono text-xs' }}
            />

            <Input
              label="GEN_TIME"
              value={result.gen_time}
              isReadOnly
              variant="bordered"
              labelPlacement="outside"
              classNames={{ input: 'font-mono' }}
            />

            <Button variant="bordered" onPress={handleCopyResult}>
              手动复制
            </Button>
          </div>
        </div>
      )}

      <div className="min-h-[100px]" />
    </div>
  )
}
