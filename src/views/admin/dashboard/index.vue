<template>
  <div class="overflow-x-hidden">
    <div>
      <div style="background: #ececec; padding: 30px">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-card>
              <a-statistic
                title="Feedback"
                :value="11.28"
                :precision="2"
                suffix="%"
                :value-style="{ color: '#3f8600' }"
                style="margin-right: 50px"
              >
                <template #prefix>
                  <arrow-up-outlined />
                </template>
              </a-statistic>
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card>
              <a-statistic
                title="Idle"
                :value="9.3"
                :precision="2"
                suffix="%"
                class="demo-class"
                :value-style="{ color: '#cf1322' }"
              >
                <template #prefix>
                  <arrow-down-outlined />
                </template>
              </a-statistic>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="mt-20">
      <a-row>
        <a-col :span="12">
          <a-statistic
            title="Active Users"
            :value="112893"
            style="margin-right: 50px"
          />
        </a-col>
        <a-col :span="12">
          <a-statistic
            title="Account Balance (CNY)"
            :precision="2"
            :value="112893"
          />
        </a-col>
      </a-row>
    </div>
    <div class="mt-20">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-statistic
            title="Feedback"
            :value="1128"
            style="margin-right: 50px"
          >
            <template #suffix>
              <like-outlined />
            </template>
          </a-statistic>
        </a-col>
        <a-col :span="12">
          <a-statistic title="Unmerged" :value="93" class="demo-class">
            <template #suffix>
              <span>/ 100</span>
            </template>
          </a-statistic>
        </a-col>
      </a-row>
    </div>
    <div class="mt-20">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-statistic-countdown
            title="Countdown"
            :value="deadline"
            style="margin-right: 50px"
            @finish="onFinish"
          />
        </a-col>
        <a-col :span="12">
          <a-statistic-countdown
            title="Million Seconds"
            :value="deadline"
            format="HH:mm:ss:SSS"
            style="margin-right: 50px"
          />
        </a-col>
        <a-col :span="24" style="margin-top: 32px">
          <a-statistic-countdown
            title="Day Level"
            :value="deadline"
            format="D 天 H 时 m 分 s 秒"
          />
        </a-col>
      </a-row>
    </div>
    <div class="mt-20">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-statistic
            title="Feedback"
            :value="1128"
            style="margin-right: 50px"
          >
            <template #suffix>
              <like-outlined />
            </template>
          </a-statistic>
        </a-col>
        <a-col :span="12">
          <a-statistic title="Unmerged" :value="93" class="demo-class">
            <template #suffix>
              <span>/ 100</span>
            </template>
          </a-statistic>
        </a-col>
      </a-row>
    </div>
    <div class="mt-20">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-statistic-countdown
            title="Countdown"
            :value="deadline"
            style="margin-right: 50px"
            @finish="onFinish"
          />
        </a-col>
        <a-col :span="12">
          <a-statistic-countdown
            title="Million Seconds"
            :value="deadline"
            format="HH:mm:ss:SSS"
            style="margin-right: 50px"
          />
        </a-col>
        <a-col :span="24" style="margin-top: 32px">
          <a-statistic-countdown
            title="Day Level"
            :value="deadline"
            format="D 天 H 时 m 分 s 秒"
          />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup lang="ts">
const onFinish = () => {
  console.log("finished!");
};
onBeforeUnmount(() => {
  console.log(`the component is now BeforeUnmount.`);
});
let deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
</script>

<style scoped></style>
