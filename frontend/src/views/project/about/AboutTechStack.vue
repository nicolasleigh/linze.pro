<script setup lang="ts">
import IconTS from "@/components/icons/IconTS.vue"
import IconJS from "@/components/icons/IconJS.vue"
import IconGo from "@/components/icons/IconGo.vue"
import IconSQL from "@/components/icons/IconSQL.vue"
import IconReact from "@/components/icons/IconReact.vue"
import IconVue from "@/components/icons/IconVue.vue"
import IconNextJs from "@/components/icons/IconNextJs.vue"
import IconTailwind from "@/components/icons/IconTailwind.vue"
import IconRedux from "@/components/icons/IconRedux.vue"
import IconReactQuery from "@/components/icons/IconReactQuery.vue"
import IconNode from "@/components/icons/IconNode.vue"
import IconPrisma from "@/components/icons/IconPrisma.vue"
import IconSocketIO from "@/components/icons/IconSocketIO.vue"
import IconRedis from "@/components/icons/IconRedis.vue"
import IconMongo from "@/components/icons/IconMongo.vue"
import IconPostgres from "@/components/icons/IconPostgres.vue"
import IconDocker from "@/components/icons/IconDocker.vue"
import IconCaddy from "@/components/icons/IconCaddy.vue"
import IconGithubActions from "@/components/icons/IconGithubActions.vue"
import IconWithTooltip from "@/components/IconWithTooltip.vue"
import { useTranslation } from "i18next-vue"
import IconExpress from "@/components/icons/IconExpress.vue"

const ulStyle = "flex gap-2"
const liStyle = "flex"
const iconStyle = "size-7 text-neutral-400 hover:text-accent"
const titleStyle = "text-lg text-neutral-100 font-semibold mt-4 mb-2  pointer-events-none"

const { t } = useTranslation()
</script>

<template>
  <h3 :class="titleStyle">{{ t("about.tech_languages") }}</h3>
  <ul :class="ulStyle">
    <li :class="liStyle">
      <IconWithTooltip tooltip="JavaScript">
        <IconJS :class="iconStyle" />
      </IconWithTooltip>
    </li>
    <li :class="liStyle">
      <IconWithTooltip tooltip="TypeScript">
        <IconTS :class="iconStyle" />
      </IconWithTooltip>
    </li>
    <li :class="liStyle">
      <IconWithTooltip tooltip="Golang">
        <IconGo :class="iconStyle" />
      </IconWithTooltip>
    </li>
    <li :class="liStyle">
      <IconWithTooltip tooltip="SQL">
        <IconSQL :class="iconStyle" />
      </IconWithTooltip>
    </li>
  </ul>
  <h3 :class="titleStyle" class="text-lg">{{ t("about.tech_frontend") }}</h3>
  <ul :class="ulStyle">
    <li :class="liStyle">
      <IconWithTooltip tooltip="React">
        <IconReact :class="iconStyle" />
      </IconWithTooltip>
    </li>
    <li :class="liStyle">
      <IconWithTooltip tooltip="React Native">
        <IconReact :class="iconStyle" />
      </IconWithTooltip>
    </li>
    <li :class="liStyle">
      <IconWithTooltip tooltip="Vue">
        <IconVue :class="iconStyle" />
      </IconWithTooltip>
    </li>
    <li :class="liStyle">
      <IconWithTooltip tooltip="Next.js">
        <IconNextJs :class="iconStyle" />
      </IconWithTooltip>
    </li>
    <li :class="liStyle">
      <IconWithTooltip tooltip="Tailwind CSS">
        <IconTailwind :class="iconStyle" />
      </IconWithTooltip>
    </li>
    <li :class="liStyle">
      <IconWithTooltip tooltip="Redux">
        <IconRedux :class="iconStyle" />
      </IconWithTooltip>
    </li>
    <li :class="liStyle">
      <IconWithTooltip tooltip="React Query">
        <IconReactQuery :class="iconStyle" />
      </IconWithTooltip>
    </li>
  </ul>
  <h3 :class="titleStyle" class="text-lg">{{ t("about.tech_backend") }}</h3>
  <ul :class="ulStyle">
    <li :class="liStyle">
      <IconWithTooltip tooltip="Node.js">
        <IconNode :class="iconStyle" />
      </IconWithTooltip>
    </li>
    <li :class="liStyle">
      <IconWithTooltip tooltip="Golang">
        <IconGo :class="iconStyle" />
      </IconWithTooltip>
    </li>
    <li :class="liStyle">
      <IconWithTooltip tooltip="Express.js">
        <IconExpress :class="iconStyle" />
      </IconWithTooltip>
    </li>
    <li :class="liStyle">
      <IconWithTooltip tooltip="Prisma">
        <IconPrisma :class="iconStyle" />
      </IconWithTooltip>
    </li>
    <li :class="liStyle">
      <IconWithTooltip tooltip="Socket.IO">
        <IconSocketIO :class="iconStyle" />
      </IconWithTooltip>
    </li>
    <li :class="liStyle">
      <IconWithTooltip tooltip="Redis">
        <IconRedis :class="iconStyle" />
      </IconWithTooltip>
    </li>
  </ul>
  <h3 :class="titleStyle" class="text-lg">{{ t("about.tech_database") }}</h3>
  <ul :class="ulStyle">
    <li :class="liStyle">
      <IconWithTooltip tooltip="MongoDB">
        <IconMongo :class="iconStyle" />
      </IconWithTooltip>
    </li>
    <li :class="liStyle">
      <IconWithTooltip tooltip="PostgreSQL">
        <IconPostgres :class="iconStyle" />
      </IconWithTooltip>
    </li>
  </ul>
  <h3 :class="titleStyle" class="text-lg">{{ t("about.tech_devops") }}</h3>
  <ul :class="ulStyle">
    <li :class="liStyle">
      <IconWithTooltip tooltip="Docker">
        <IconDocker :class="iconStyle" />
      </IconWithTooltip>
    </li>
    <li :class="liStyle">
      <IconWithTooltip tooltip="Caddy">
        <IconCaddy :class="iconStyle" />
      </IconWithTooltip>
    </li>
    <li :class="liStyle">
      <IconWithTooltip tooltip="GitHub Actions">
        <IconGithubActions :class="iconStyle" />
      </IconWithTooltip>
    </li>
  </ul>
</template>
