import React from 'react'
import { DouyinCommentProps, DouyinDynamicProps } from '../types/douyin'

interface DataManagerProps {
  selectedTemplate: 'comment' | 'dynamic'
  commentData: DouyinCommentProps['data'] | null
  dynamicData: DouyinDynamicProps['data'] | null
  onCommentDataChange: (data: DouyinCommentProps['data']) => void
  onDynamicDataChange: (data: DouyinDynamicProps['data']) => void
  onSave: (type: 'comment' | 'dynamic', data: any) => void
}

/**
 * 数据管理组件
 */
export const DataManager: React.FC<DataManagerProps> = ({
  selectedTemplate,
  commentData,
  dynamicData,
  onCommentDataChange,
  onDynamicDataChange,
  onSave
}) => {
  const currentData = selectedTemplate === 'comment' ? commentData : dynamicData

  /**
   * 处理数据变更
   */
  const handleDataChange = (newData: any) => {
    if (selectedTemplate === 'comment') {
      onCommentDataChange(newData)
    } else {
      onDynamicDataChange(newData)
    }
  }

  /**
   * 保存数据
   */
  const handleSave = () => {
    if (currentData) {
      onSave(selectedTemplate, currentData)
    }
  }

  if (!currentData) {
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="text-center text-gray-500">
          正在加载数据...
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">
          {selectedTemplate === 'comment' ? '评论数据' : '动态数据'}
        </h3>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {/* 主题切换 */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={currentData.useDarkTheme || false}
                onChange={(e) => handleDataChange({
                  ...currentData,
                  useDarkTheme: e.target.checked
                })}
                className="mr-2"
              />
              深色主题
            </label>
          </div>

          {/* 动态数据特有字段 */}
          {selectedTemplate === 'dynamic' && (
            <>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  用户名
                </label>
                <input
                  type="text"
                  value={(currentData as DouyinDynamicProps['data']).username || ''}
                  onChange={(e) => handleDataChange({
                    ...currentData,
                    username: e.target.value
                  })}
                  className="px-3 py-2 w-full rounded-md border border-gray-300"
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  作品描述
                </label>
                <textarea
                  value={(currentData as DouyinDynamicProps['data']).desc || ''}
                  onChange={(e) => handleDataChange({
                    ...currentData,
                    desc: e.target.value
                  })}
                  rows={3}
                  className="px-3 py-2 w-full rounded-md border border-gray-300"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    点赞数
                  </label>
                  <input
                    type="text"
                    value={(currentData as DouyinDynamicProps['data']).dianzan || ''}
                    onChange={(e) => handleDataChange({
                      ...currentData,
                      dianzan: e.target.value
                    })}
                    className="px-3 py-2 w-full rounded-md border border-gray-300"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    评论数
                  </label>
                  <input
                    type="text"
                    value={(currentData as DouyinDynamicProps['data']).pinglun || ''}
                    onChange={(e) => handleDataChange({
                      ...currentData,
                      pinglun: e.target.value
                    })}
                    className="px-3 py-2 w-full rounded-md border border-gray-300"
                  />
                </div>
              </div>
            </>
          )}

          {/* JSON编辑器 */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              JSON数据 (高级编辑)
            </label>
            <textarea
              value={JSON.stringify(currentData, null, 2)}
              onChange={(e) => {
                try {
                  const newData = JSON.parse(e.target.value)
                  handleDataChange(newData)
                } catch (error) {
                  // 忽略JSON解析错误，让用户继续编辑
                }
              }}
              rows={10}
              className="px-3 py-2 w-full font-mono text-sm rounded-md border border-gray-300"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleSave}
            className="px-4 py-2 w-full text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            保存数据
          </button>
        </div>
      </div>
    </div>
  )
}