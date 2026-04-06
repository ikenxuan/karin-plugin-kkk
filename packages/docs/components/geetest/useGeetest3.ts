'use client';
import { useState, useRef, useCallback } from 'react';
import { toast } from '@heroui/react';
import type { Geetest3CaptchaObj } from './types';

export type CaptchaType = 'fullpage' | 'slide' | 'click' | 'icon';

const CAPTCHA_TYPE_MAP: Record<CaptchaType, string> = {
  fullpage: 'register-fullpage',
  slide: 'register-slide',
  click: 'register-click',
  icon: 'register-icon',
};

export function useGeetest3() {
  const [gt, setGt] = useState('');
  const [challenge, setChallenge] = useState('');
  const [validate, setValidate] = useState('');
  const [seccode, setSeccode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [captchaType, setCaptchaType] = useState<CaptchaType>('fullpage');
  const captchaRef = useRef<Geetest3CaptchaObj | null>(null);

  const handleOnlineTest = useCallback(async () => {
    try {
      const timestamp = Date.now();
      const endpoint = CAPTCHA_TYPE_MAP[captchaType];

      const response = await fetch(`/api/geetest/${endpoint}?t=${timestamp}`);
      const data = await response.json();

      setGt(data.gt);
      setChallenge(data.challenge);
      setIsSuccess(false);
      setValidate('');
      setSeccode('');
      toast.success('获取成功', {
        description: '请点击生成验证码',
      });
    } catch {
      toast.danger('获取失败', {
        description: '无法获取测试参数，请手动输入',
      });
    }
  }, [captchaType]);

  const handleGenerate = useCallback(() => {
    if (!gt.trim() || !challenge.trim()) {
      toast.warning('提示', {
        description: 'gt 和 challenge 不能为空',
      });
      return;
    }

    if (gt.length !== 32 || challenge.length !== 32) {
      toast.warning('提示', {
        description: 'gt 或 challenge 长度错误（需要32位）',
      });
      return;
    }

    setValidate('');
    setSeccode('');
    setIsSuccess(false);
    setIsLoading(true);

    initGeetest(
      {
        gt: gt.trim(),
        challenge: challenge.trim(),
        offline: false,
        new_captcha: true,
        product: 'bind',
        width: '100%',
      },
      (captchaObj) => {
        captchaRef.current = captchaObj;

        setTimeout(() => {
          setIsLoading(false);
          captchaObj.verify();
        }, Math.floor(Math.random() * 1000) + 500);

        captchaObj.onSuccess(() => {
          const result = captchaObj.getValidate();
          if (result) {
            setValidate(result.geetest_validate);
            setSeccode(result.geetest_seccode);
            setIsSuccess(true);
            toast.success('验证成功', {
              description: '你现在可以复制结果了',
            });
          }
        });

        captchaObj.onError((err) => {
          setIsLoading(false);
          toast.danger('验证失败', {
            description: err.msg || '请重试',
          });
        });
      }
    );
  }, [gt, challenge]);

  const handleCopyResult = useCallback(() => {
    if (!validate || !seccode) {
      toast.warning('提示', {
        description: '请先完成验证',
      });
      return;
    }

    const text = `validate=${validate}&seccode=${seccode}`;
    navigator.clipboard.writeText(text).then(
      () => toast.success('复制成功'),
      () => toast.danger('复制失败')
    );
  }, [validate, seccode]);

  const handleReset = useCallback(() => {
    setIsSuccess(false);
    setValidate('');
    setSeccode('');
  }, []);

  return {
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
  };
}
