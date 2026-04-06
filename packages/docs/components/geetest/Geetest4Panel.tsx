'use client';
import { useEffect, useRef } from 'react';
import { Button, Input, Label, Separator, Spinner, TextField, toast } from '@heroui/react';
import gsap from 'gsap';
import { useGeetest4 } from './useGeetest4';

interface Geetest4PanelProps {
  initialCaptchaId?: string;
}

export function Geetest4Panel({ initialCaptchaId }: Geetest4PanelProps) {
  const resultRef = useRef<HTMLDivElement>(null);
  const {
    captchaId,
    result,
    isLoading,
    isSuccess,
    setCaptchaId,
    handleGenerate,
    handleCopyResult,
    handleReset,
  } = useGeetest4();

  useEffect(() => {
    if (initialCaptchaId) setCaptchaId(initialCaptchaId);
  }, [initialCaptchaId, setCaptchaId]);

  useEffect(() => {
    if (result) {
      const text = `lot_number=${result.lot_number}&captcha_output=${result.captcha_output}&pass_token=${result.pass_token}&gen_time=${result.gen_time}`;
      navigator.clipboard.writeText(text).then(
        () => toast.success('已自动复制到剪贴板'),
        () => {}
      );

      if (resultRef.current) {
        gsap.fromTo(
          resultRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
        );
      }
    }
  }, [result]);

  return (
    <div className="flex flex-col gap-5">
      <TextField>
        <Label>CAPTCHA_ID</Label>
        <Input
          placeholder="请输入 captcha_id"
          value={captchaId}
          onChange={(event) => setCaptchaId(event.target.value)}
        />
      </TextField>

      {isLoading ? (
        <div className="h-10 rounded-md bg-surface-secondary flex items-center justify-center">
          <Spinner size="sm" />
        </div>
      ) : isSuccess ? (
        <Button variant="secondary" className="w-full text-success" onPress={handleReset}>
          验证成功（点击重置）
        </Button>
      ) : (
        <Button variant="primary" className="w-full" onPress={handleGenerate}>
          生成验证码
        </Button>
      )}

      {result && (
        <div ref={resultRef}>
          <Separator className="my-3" />
          <div className="flex flex-col gap-4">
            <p className="text-center text-sm font-medium text-foreground">验证结果</p>

            <TextField>
              <Label>LOT_NUMBER</Label>
              <Input value={result.lot_number} readOnly className="font-mono" />
            </TextField>

            <TextField>
              <Label>CAPTCHA_OUTPUT</Label>
              <Input value={result.captcha_output} readOnly className="font-mono text-xs" />
            </TextField>

            <TextField>
              <Label>PASS_TOKEN</Label>
              <Input value={result.pass_token} readOnly className="font-mono text-xs" />
            </TextField>

            <TextField>
              <Label>GEN_TIME</Label>
              <Input value={result.gen_time} readOnly className="font-mono" />
            </TextField>

            <Button variant="outline" onPress={handleCopyResult}>
              手动复制
            </Button>
          </div>
        </div>
      )}

      <div className="min-h-[100px]" />
    </div>
  );
}
