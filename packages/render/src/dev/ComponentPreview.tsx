import React, { useState } from 'react'
import { Card, CardBody, CardHeader, Button, Slider } from '@heroui/react'
import { Eye, Download, Maximize2, Minimize2 } from 'lucide-react'
import { DouyinComment } from '../components/platforms/douyin/Comment'
import { DouyinDynamic } from '../components/platforms/douyin/Dynamic'
import { DouyinCommentProps, DouyinDynamicProps } from '../types/douyin'
import { version } from '../services/DataService'

interface ComponentPreviewProps {
  selectedTemplate: 'comment' | 'dynamic'
  commentData: DouyinCommentProps['data'] | null
  dynamicData: DouyinDynamicProps['data'] | null
  qrCodeDataUrl: string
}

/**
 * 组件预览面板
 * @param props 组件属性
 * @returns JSX元素
 */
export const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  selectedTemplate,
  commentData,
  dynamicData,
  qrCodeDataUrl
}) => {
  const [scale, setScale] = useState(0.5)

  const currentData = selectedTemplate === 'comment' ? commentData : dynamicData

  if (!currentData) {
    return (
      <Card className="h-full">
        <CardBody>
          <div className="flex justify-center items-center h-full text-gray-500">
            正在加载预览...
          </div>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex-shrink-0">
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-2 items-center">
            <Eye className="flex-shrink-0 w-5 h-5" />
            <h3 className="text-lg font-semibold whitespace-nowrap">
              组件预览 - {selectedTemplate === 'comment' ? '抖音评论' : '抖音动态'}
            </h3>
          </div>
          <div className="flex flex-shrink-0 gap-4 items-center">
            <span className="text-sm text-gray-600 whitespace-nowrap">
              缩放: {(scale * 100).toFixed(1)}%
            </span>
            <Slider
              size="sm"
              step={0.001}
              minValue={0.1}
              maxValue={2.0}
              value={scale}
              onChange={(value) => setScale(Array.isArray(value) ? value[0] : value)}
              className="w-32"
              color="primary"
              showTooltip={true}
              tooltipProps={{
                content: `${(scale * 100).toFixed(1)}%`,
                placement: "top"
              }}
            />
            <Button
              size="sm"
              variant="flat"
              startContent={scale < 0.6 ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              onPress={() => setScale(scale < 0.6 ? 1 : 0.3)}
            >
              {scale < 0.6 ? '放大' : '缩小'}
            </Button>
            <Button
              size="sm"
              variant="flat"
              startContent={<Download className="w-4 h-4" />}
            >
              导出
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-auto flex-1">
        <div className="flex justify-center items-start py-4 min-h-full">
          <div
            className="bg-white border border-gray-300 shadow-lg origin-top"
            style={{
              transform: `scale(${scale})`,
              width: '1440px',
              transformOrigin: 'top center'
            }}
          >
            {selectedTemplate === 'comment' && commentData && (
              <DouyinComment
                data={commentData}
                qrCodeDataUrl={qrCodeDataUrl}
                version={version}
                scale={1}
              />
            )}

            {selectedTemplate === 'dynamic' && dynamicData && (
              <DouyinDynamic
                data={dynamicData}
                qrCodeDataUrl={qrCodeDataUrl}
                version={version}
                scale={1}
              />
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  )
}