import { useEffect, useRef } from 'react'
import {
  Input,
  Button,
  Spinner,
  Divider,
  Select,
  SelectItem,
  Accordion,
  AccordionItem,
  addToast,
} from '@heroui/react'
import gsap from 'gsap'
import { useGeetest3, type CaptchaType } from './useGeetest3'

const captchaTypes = [
  { key: 'fullpage', label: '一键通过' },
  { key: 'slide', label: '滑块验证' },
  { key: 'click', label: '文字点选' },
  { key: 'icon', label: '图案点选' },
] as const

interface Geetest3PanelProps {
  initialGt?: string
  initialChallenge?: string
}

export function Geetest3Panel({ initialGt, initialChallenge }: Geetest3PanelProps) {
  const resultRef = useRef<HTMLDivElement>(null)
  const {
    gt,
    challenge,
    validate,
    seccode,
    isLoading,
    isSuccess,
    captchaType,
    setGt,
    setChallenge,
    setCaptchaType,
    handleOnlineTest,
    handleGenerate,
    handleCopyResult,
    handleReset,
  } = useGeetest3()

  useEffect(() => {
    if (initialGt) setGt(initialGt)
    if (initialChallenge) setChallenge(initialChallenge)
  }, [initialGt, initialChallenge, setGt, setChallenge])

  useEffect(() => {
    if (validate && seccode) {
      const text = `validate=${validate}&seccode=${seccode}`
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
  }, [validate, seccode])

  return (
    <div className="flex flex-col gap-5">
      <Input
        label="GT"
        placeholder="请输入 gt 值（32位）"
        value={gt}
        onValueChange={setGt}
        variant="bordered"
        labelPlacement="outside"
      />

      <Input
        label="CHALLENGE"
        placeholder="请输入 challenge 值（32位）"
        value={challenge}
        onValueChange={setChallenge}
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

      {(validate || seccode) && (
        <div ref={resultRef}>
          <Divider className="my-3" />
          <div className="flex flex-col gap-4">
            <p className="text-center text-sm font-medium text-foreground">验证结果</p>

            <Input
              label="VALIDATE"
              value={validate}
              isReadOnly
              variant="bordered"
              labelPlacement="outside"
              classNames={{ input: 'font-mono' }}
            />

            <Input
              label="SECCODE"
              value={seccode}
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

      <Accordion isCompact variant="splitted">
        <AccordionItem
          key="test-tools"
          aria-label="测试工具"
          title={<span className="text-sm font-medium">测试工具</span>}
          subtitle={<span className="text-xs text-default-400">在线获取测试参数</span>}
          classNames={{ base: 'shadow-sm' }}
        >
          <div className="flex flex-col gap-4 pb-2">
            <Select
              label="验证类型"
              selectedKeys={[captchaType]}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as CaptchaType
                if (selected) setCaptchaType(selected)
              }}
              variant="bordered"
              labelPlacement="outside"
            >
              {captchaTypes.map((type) => (
                <SelectItem key={type.key}>{type.label}</SelectItem>
              ))}
            </Select>

            <Button variant="bordered" color="primary" onPress={handleOnlineTest}>
              获取测试参数
            </Button>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
