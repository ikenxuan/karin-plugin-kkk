'use client';
import { useEffect, useRef } from 'react';
import {
  Accordion,
  Button,
  Input,
  Label,
  ListBox,
  Select,
  Separator,
  Spinner,
  TextField,
  toast,
} from '@heroui/react';
import gsap from 'gsap';
import { useGeetest3, type CaptchaType } from './useGeetest3';

const captchaTypes = [
  { key: 'fullpage', label: '一键通过' },
  { key: 'slide', label: '滑块验证' },
  { key: 'click', label: '文字点选' },
  { key: 'icon', label: '图案点选' },
] as const;

interface Geetest3PanelProps {
  initialGt?: string;
  initialChallenge?: string;
}

export function Geetest3Panel({ initialGt, initialChallenge }: Geetest3PanelProps) {
  const resultRef = useRef<HTMLDivElement>(null);
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
  } = useGeetest3();

  useEffect(() => {
    if (initialGt) setGt(initialGt);
    if (initialChallenge) setChallenge(initialChallenge);
  }, [initialGt, initialChallenge, setGt, setChallenge]);

  useEffect(() => {
    if (validate && seccode) {
      const text = `validate=${validate}&seccode=${seccode}`;
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
  }, [validate, seccode]);

  return (
    <div className="flex flex-col gap-5">
      <TextField>
        <Label>GT</Label>
        <Input
          placeholder="请输入 gt 值（32位）"
          value={gt}
          onChange={(event) => setGt(event.target.value)}
        />
      </TextField>

      <TextField>
        <Label>CHALLENGE</Label>
        <Input
          placeholder="请输入 challenge 值（32位）"
          value={challenge}
          onChange={(event) => setChallenge(event.target.value)}
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

      {(validate || seccode) && (
        <div ref={resultRef}>
          <Separator className="my-3" />
          <div className="flex flex-col gap-4">
            <p className="text-center text-sm font-medium text-foreground">验证结果</p>

            <TextField>
              <Label>VALIDATE</Label>
              <Input value={validate} readOnly className="font-mono" />
            </TextField>

            <TextField>
              <Label>SECCODE</Label>
              <Input value={seccode} readOnly className="font-mono" />
            </TextField>

            <Button variant="outline" onPress={handleCopyResult}>
              手动复制
            </Button>
          </div>
        </div>
      )}

      <Accordion className="border border-border bg-surface shadow-sm" variant="surface">
        <Accordion.Item id="test-tools">
          <Accordion.Heading>
            <Accordion.Trigger className="py-3">
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">测试工具</span>
                <span className="text-xs text-muted">在线获取测试参数</span>
              </div>
              <Accordion.Indicator />
            </Accordion.Trigger>
          </Accordion.Heading>
          <Accordion.Panel>
            <Accordion.Body className="pb-2">
              <div className="flex flex-col gap-4">
                <Select
                  value={captchaType}
                  onChange={(key) => {
                    if (typeof key === 'string') {
                      setCaptchaType(key as CaptchaType);
                    }
                  }}
                  placeholder="请选择验证类型"
                >
                  <Label>验证类型</Label>
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {captchaTypes.map((type) => (
                        <ListBox.Item key={type.key} id={type.key} textValue={type.label}>
                          {type.label}
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>

                <Button variant="secondary" onPress={handleOnlineTest}>
                  获取测试参数
                </Button>
              </div>
            </Accordion.Body>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
