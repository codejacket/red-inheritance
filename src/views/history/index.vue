<script name="History" setup>
import { listHistory } from '@/api/history'
import videoCover from '@/assets/img/video-cover-敢教日月换新天.png'
import video from '@/assets/video/敢教日月换新天.mp4'
import Card from '@/components/Card'
import { downloadFile } from '@/utils'
import { useAppStore } from '@store/app'
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

const router = useRouter()
const { isPhone } = storeToRefs(useAppStore())
const history = ref([])

listHistory().then(res => {
  history.value = res.data
})

function timelineItemClass(index) {
  if (isPhone.value) {
    return 'phone-item'
  } else {
    return {
      ['left-item']: !(index % 2),
      ['right-item']: index % 2,
    }
  }
}

function slideDirection(index) {
  if (isPhone.value) {
    return 'fadeInLeft'
  } else {
    return index % 2 ? 'fadeInLeft' : 'fadeInRight'
  }
}

function goHistoryDetail(event) {
  router.push({
    path: `historyDetail/${event.eventId}`,
  })
}
</script>

<template>
  <div class="app-container flex flex-col items-center">
    <h2 class="my30px text-28px text-center color-red-primary">
      <img style="vertical-align: sub" src="@/assets/img/red-book.png" />
      <span class="ml6px">中国共产党百年历史脉络</span>
    </h2>
    <div class="card mb40px w100% p40px">
      <div class="timeline">
        <div class="timeline-section" v-for="(item, index) in history" :key="index">
          <h3 class="mb20px text-22px color-red-primary text-center">
            {{ item.periodName }}
          </h3>
          <div class="timeline-items">
            <div class="timeline-line" :style="{ left: isPhone ? '0' : '50%' }" />
            <div
              :class="['timeline-item', timelineItemClass(index)]"
              v-for="(event, index) in item.events"
            >
              <div class="timeline-dot" />
              <div v-enter:[slideDirection(index)] class="timeline-content">
                <h4 @click="goHistoryDetail(event)">
                  {{ event.eventTime }}：{{ event.eventName }}
                </h4>
                <p class="line-clamp-4">{{ event.summary }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <card class="mb40px w90%" title-icon="video" title="百年党史纪录片片段">
      <video-player class="video-player-container" :src="video" :poster="videoCover" controls />
      <div class="video-desc">
        <p>
          本片段节选自首部全景式展现中国共产党百年历程的纪录片《敢教日月换新天》，该片以“为人民谋幸福、为民族谋复兴”为主题，生动展现了中国共产党百年奋斗的光辉历程和伟大成就。视频通过珍贵历史影像和实景拍摄，还原了中国共产党带领中国人民从站起来、富起来到强起来的伟大飞跃，是学习党史的生动教材。
        </p>
      </div>
    </card>
    <card class="mb40px w90%" title-icon="download" title="党史学习资源下载">
      <div class="flex flex-wrap gap20px justify-center">
        <div class="red-btn" @click="downloadFile('中国共产党简史.pdf')">
          <svg-icon icon="file-pdf" />
          <span class="ml5px">中国共产党简史.pdf</span>
        </div>
        <div class="red-btn" @click="downloadFile('党史知识题库.docx')">
          <svg-icon icon="file-word" />
          <span class="ml5px">党史知识题库.docx</span>
        </div>
        <div class="red-btn" @click="downloadFile('红色历史图片集.zip')">
          <svg-icon icon="file-image" />
          <span class="ml5px">红色历史图片集.zip</span>
        </div>
        <div class="red-btn" @click="downloadFile('党史音频解读包.zip')">
          <svg-icon icon="file-audio" />
          <span class="ml5px">党史音频解读包.zip</span>
        </div>
      </div>
      <p class="mt20px text-14px color-#666 text-center">
        注：登录后可下载完整学习资源，所有资源均为免费公益性质，仅供学习使用
      </p>
    </card>
  </div>
</template>

<style lang="scss" scoped>
.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 50px;
  max-width: 1000px;
  margin: 0 auto;

  .timeline-section {
    position: relative;

    .timeline-items {
      position: relative;
      padding-top: 20px;

      .timeline-line {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 50%;
        width: 4px;
        background-color: var(--red-primary);
        border-radius: 2px;
        transform: translateX(-50%);
      }

      .timeline-item {
        position: relative;
        box-sizing: border-box;
        margin-bottom: 20px;

        .timeline-dot {
          position: absolute;
          top: 15px;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          background-color: var(--red-primary);
          border-radius: 50%;

          &::before {
            width: 10px;
            height: 10px;
            content: '';
            background-color: var(--gold);
            border-radius: 50%;
          }
        }

        .timeline-content {
          padding: 20px;
          background-color: #f9f9f9;
          border-left: 4px solid var(--red-primary);
          border-radius: var(--radius-md);
          transition: var(--transition-base);

          &:hover {
            box-shadow: var(--shadow-out-sm);
            transform: translateY(-5px);
          }

          h4 {
            margin-bottom: 10px;
            font-size: 18px;
            color: var(--red-primary);
            text-underline-offset: 6px;
            cursor: pointer;

            &:hover {
              text-decoration: underline;
            }
          }

          p {
            line-height: 1.7;
            color: #666;
          }
        }

        &.right-item {
          left: 50%;
          width: 50%;
          padding: 10px 40px;

          .timeline-dot {
            left: -10px;
          }
        }

        &.left-item {
          left: 0;
          width: 50%;
          padding: 10px 40px;

          .timeline-dot {
            right: -10px;
          }
        }

        &.phone-item {
          left: 0;
          width: 100%;
          padding: 10px 0 10px 30px;

          .timeline-dot {
            left: -10px;
          }
        }
      }
    }
  }
}

.video-player-container {
  position: relative;
  width: 100%;
  height: unset;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-out-sm);

  :deep(.vjs-big-play-button) {
    top: 50%;
    left: 50%;
    margin: 0;
    transform: translate(-50%, -50%);
  }
}

.video-desc {
  padding: 20px;
  margin-top: 25px;
  line-height: 1.8;
  color: #666;
  background-color: #f9f9f9;
  border-left: 4px solid var(--red-primary);
  border-radius: var(--radius-md);
}

.red-btn {
  width: 40%;
  padding: 15px;
  text-align: center;

  @include respond-to('phone') {
    width: 100%;
  }
}
</style>
