import { useState, useRef, useCallback } from 'react'
import { addToast } from '@heroui/react'
import type { Geetest4CaptchaObj, Geetest4Result } from './types'

const TEST_CAPTCHA_ID = '54088bb07d2df3c46b79f80300b0abbe'

export function useGeetest4() {
  const [captchaId, setCaptchaId] = useState(TEST_CAPTCHA_ID)
  const [result, setResult] = useState<Geetest4Result | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const captchaRef = useRef<Geetest4CaptchaObj | null>(null)

  const handleGenerate = useCallback(() => {
    if (!captchaId.trim()) {
      addToast({
        title: '提示',
        description: 'captcha_id 不能为空',
        color: 'warning',
      })
      return
    }

    setResult(null)
    setIsSuccess(false)
    setIsLoading(true)

    if (captchaRef.current) {
      captchaRef.current.destroy()
      captchaRef.current = null
    }

    initGeetest4(
      {
        captchaId: captchaId.trim(),
        product: 'bind',
      },
      (captchaObj) => {
        captchaRef.current = captchaObj

        captchaObj
          .onReady(() => {
            setIsLoading(false)
            captchaObj.showCaptcha()
          })
          .onSuccess(() => {
            const validateResult = captchaObj.getValidate()
            if (validateResult) {
              setResult(validateResult)
              setIsSuccess(true)
              addToast({
                title: '验证成功',
                description: '你现在可以复制结果了',
                color: 'success',
              })
            }
          })
          .onError((err) => {
            setIsLoading(false)
            addToast({
              title: '验证失败',
              description: err.msg || '请重试',
              color: 'danger',
            })
          })
          .onClose(() => {
            setIsLoading(false)
          })
      }
    )
  }, [captchaId])

  const handleCopyResult = useCallback(() => {
    if (!result) {
      addToast({
        title: '提示',
        description: '请先完成验证',
        color: 'warning',
      })
      return
    }

    const text = `lot_number=${result.lot_number}&captcha_output=${result.captcha_output}&pass_token=${result.pass_token}&gen_time=${result.gen_time}`
    navigator.clipboard.writeText(text).then(
      () => addToast({ title: '复制成功', color: 'success' }),
      () => addToast({ title: '复制失败', color: 'danger' })
    )
  }, [result])

  const handleReset = useCallback(() => {
    setResult(null)
    setIsSuccess(false)
    setIsLoading(false)
    if (captchaRef.current) {
      captchaRef.current.destroy()
      captchaRef.current = null
    }
  }, [])

  return {
    captchaId,
    result,
    isLoading,
    isSuccess,
    setCaptchaId,
    handleGenerate,
    handleCopyResult,
    handleReset,
  }
}
