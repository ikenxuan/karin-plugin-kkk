import { getValue } from '../utils'
import type { ConfigPageProps } from './pageTypes'

const KuaishouConfigPage = ({ config, renderers, classes }: ConfigPageProps) => {
  const { renderPageHeader, renderSubSection, renderSwitch, renderTextField } = renderers
  const kuaishouEnabled = getValue<boolean>(config, ['kuaishou', 'switch'], false)
  const kuaishouComment = getValue<boolean>(config, ['kuaishou', 'comment'], false)

  return (
    <>
      {renderPageHeader('快手', '快手解析基础设置。')}
      <div className={classes.topLevelFields} data-config-section>
        {renderSwitch(['kuaishou', 'switch'], '解析开关', '快手解析开关，此开关为单独开关。')}
      </div>
      {renderSubSection(
        '评论详情设置',
        <>
          {renderSwitch(['kuaishou', 'comment'], '评论解析', '快手评论解析，开启后可发送快手作品评论图。', !kuaishouEnabled)}
          {renderTextField(['kuaishou', 'numcomment'], '评论解析数量', '快手评论解析数量。', {
            type: 'number',
            fallback: 5,
            min: 1,
            disabled: !kuaishouEnabled || !kuaishouComment
          })}
        </>
      )}
    </>
  )
}

export default KuaishouConfigPage
