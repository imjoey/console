/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import React, { Component } from 'react'
import classnames from 'classnames'

import { Modal } from 'components/Base'

import { ReactComponent as BarIcon } from 'src/assets/bar-chart.svg'
import { ReactComponent as LineIcon } from 'src/assets/line-chart.svg'
// import { ReactComponent as TableIcon } from 'src/assets/table-chart.svg'

import positionPreviewRight from 'src/assets/new-custom-monitor-position-right.png'

import FormGroupCard from '../FormGroupCard'
import styles from './index.scss'

export default class GraphTypeSelectModal extends Component {
  state = {
    type: 'line',
  }

  /**
   * @TODO: move in config file
   */
  typeConfig = {
    line: {
      Icon: LineIcon,
      name: t('LINE_CHART'),
      desc: [
        {
          title: t('APPLICABLE_SCENE'),
          description: t('LINE_CHART_DESC'),
        },
        {
          title: t('BASE_LINE_CHART'),
          description: t('BASE_LINE_CHART_DESC'),
        },
        {
          title: t('STACK_LINE_CHART'),
          description: t('STACK_LINE_CHART_DESC'),
        },
      ],
      postionIMG: positionPreviewRight,
    },
    bar: {
      Icon: BarIcon,
      name: t('BAR_CHART'),
      desc: [
        {
          title: t('APPLICABLE_SCENE'),
          description: t('BAR_CHART_DESC'),
        },
        {
          title: t('BASE_BAR_CHART'),
          description: t('BASE_BAR_CHART_DESC'),
        },
        {
          title: t('STACK_BAR_CHART'),
          description: t('STACK_BAR_CHART_DESC'),
        },
      ],
      postionIMG: positionPreviewRight,
    },
  }

  handleClick = e => {
    this.setState({ type: e.currentTarget.dataset.type })
  }

  onOk = () => {
    this.props.onOk(this.state.type)
  }

  render() {
    const { visible, onCancel } = this.props
    const { type } = this.state

    const config = this.typeConfig[type]

    return (
      <Modal
        width={960}
        imageIcon={'/assets/coin.svg'}
        title={t('SELECT_CHART_TYPE')}
        description={t('SELECT_CHART_TYPE_MODAL_DESC')}
        visible={visible}
        onCancel={onCancel}
        onOk={this.onOk}
      >
        <div className={styles.wrapper}>
          <FormGroupCard label={t('GRAPH_TYPES')}>
            {Object.entries(this.typeConfig).map(([key, Message]) => (
              <div
                key={key}
                data-type={key}
                onClick={this.handleClick}
                className={styles.typeOpts}
              >
                <div
                  className={classnames(styles.typeOpt, {
                    [styles.select]: key === type,
                  })}
                >
                  <Message.Icon className={styles.icon} />
                  <h4>{Message.name}</h4>
                </div>
              </div>
            ))}
          </FormGroupCard>

          {config.desc.map(des => (
            <div key={des.title}>
              <h3>{des.title}</h3>
              <p>{des.description}</p>
            </div>
          ))}
          <FormGroupCard label={t('DISPLAY_POSITION')}>
            <div className={styles.position}>
              <img src={config.postionIMG} alt="right" />
            </div>
          </FormGroupCard>
        </div>
      </Modal>
    )
  }
}
