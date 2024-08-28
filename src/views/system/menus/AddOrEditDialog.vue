<!--
 * @Description: 
 * @Date: 2024-04-07 18:19:26
 * @LastEditTime: 2024-05-20 18:16:46
-->
<template>
  <el-dialog v-model="dialogVisible" :title="title" width="36%" @close="close">
    <el-form ref="formRef" :model="formEntity" :rules="rules" label-width="110px">
      <el-form-item label="上级菜单" prop="pid">
        <el-tree-select
          v-model="formEntity.pid"
          :data="tree"
          :props="{
            value: 'id',
            label: 'name',
            children: 'childList'
          }"
          value-key="id"
          placeholder="选择上级菜单"
          check-strictly
        />
      </el-form-item>
      <el-form-item label="菜单类型" prop="menuType">
        <el-radio-group v-model="formEntity.menuType">
          <el-radio value="M">目录</el-radio>
          <el-radio value="C">菜单</el-radio>
          <el-radio value="F">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="formEntity.name" placeholder="请输入菜单名称" />
      </el-form-item>
      <el-form-item v-show="formEntity.menuType != 'F'" label="菜单图标" prop="icon">
        <select-icon v-model:icon-value="formEntity.icon" />
      </el-form-item>
      <el-form-item label="显示排序" prop="sort">
        <el-input-number v-model="formEntity.sort" controls-position="right" :min="0" />
      </el-form-item>
      <el-form-item v-show="formEntity.menuType != 'F'" prop="path">
        <template #label>
          <el-tooltip content="访问的路由地址，如：`user`，如外网地址需内链访问则以`http(s)://`开头" placement="top">
            <el-space>
              <el-icon>
                <warning-filled />
              </el-icon>
              路由地址
            </el-space>
          </el-tooltip>
        </template>
        <el-input v-model="formEntity.path" placeholder="请输入路由地址" />
      </el-form-item>
      <el-form-item v-show="formEntity.menuType == 'C'" prop="component">
        <template #label>
          <el-tooltip content="访问的组件路径，如：`system/user/index`，默认在`views`目录下" placement="top">
            <el-space>
              <el-icon>
                <warning-filled />
              </el-icon>
              组件路径
            </el-space>
          </el-tooltip>
        </template>
        <el-input v-model="formEntity.component" placeholder="请输入组件路径" />
      </el-form-item>
      <el-form-item v-show="formEntity.menuType != 'M'" prop="perms">
        <el-input v-model="formEntity.perms" placeholder="请输入权限标识" maxlength="100" />
        <template #label>
          <el-tooltip content="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasPermi('system:user:list')`)" placement="top">
            <el-space>
              <el-icon>
                <warning-filled />
              </el-icon>
              权限字符
            </el-space>
          </el-tooltip>
        </template>
      </el-form-item>
      <el-form-item v-show="formEntity.menuType == 'C'" prop="query">
        <el-input v-model="formEntity.query" placeholder="请输入路由参数" maxlength="255" />
        <template #label>
          <el-tooltip content="访问路由的默认传递参数，如：`{id: 1, name: ry}`" placement="top">
            <el-space>
              <el-icon>
                <warning-filled />
              </el-icon>
              路由参数
            </el-space>
          </el-tooltip>
        </template>
      </el-form-item>
      <el-form-item v-show="formEntity.menuType == 'C'" prop="isKeepAlive">
        <template #label>
          <el-tooltip content="选择是则会被`keep-alive`缓存，需要匹配组件的`name`和地址保持一致" placement="top">
            <el-space>
              <el-icon>
                <warning-filled />
              </el-icon>
              是否缓存
            </el-space>
          </el-tooltip>
        </template>
        <el-radio-group v-model="formEntity.isKeepAlive">
          <el-radio :value="true">缓存</el-radio>
          <el-radio :value="false">不缓存</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="isShow">
        <template #label>
          <el-tooltip content="选择隐藏则路由将不会出现在侧边栏，但仍然可以访问" placement="top">
            <el-space>
              <el-icon>
                <warning-filled />
              </el-icon>
              显示状态
            </el-space>
          </el-tooltip>
        </template>
        <el-radio-group v-model="formEntity.isShow">
          <el-radio :value="true">显示</el-radio>
          <el-radio :value="false">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button :loading="saveLoading" type="primary" @click="onSave">保存</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import SelectIcon from "@/components/SelectIcon/index.vue";
import { WarningFilled } from "@element-plus/icons-vue";
import { computed, PropType, ref, toRaw, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean
  },
  title: {
    type: String,
    default: "菜单"
  },
  tree: {
    type: Array,
    default: () => []
  },
  initialValue: {
    type: Object as PropType<Partial<typeof formEntity>>,
    default: () => ({})
  }
});

const emit = defineEmits(["update:modelValue", "close", "finish"]);

const formRef = ref();

const saveLoading = ref(false);

const formInitialValue = {
  pid: "",
  menuType: "M",
  name: "",
  sort: void 0,
  icon: "",
  path: "",
  perms: "",
  query: "",
  isShow: true,
  component: "",
  isKeepAlive: false,
  childList: []
};

const formEntity = ref(formInitialValue);

const rules = {
  name: [{ required: true, message: "", trigger: "blur" }],
  sort: [{ required: true, message: "", trigger: "blur" }],
  path: [{ required: true, message: "", trigger: "blur" }]
};

const dialogVisible = computed({
  get() {
    return props.modelValue;
  },
  set(v) {
    emit("update:modelValue", v);
  }
});

const close = () => {
  emit("update:modelValue", false);
  emit("close");
  formRef.value?.resetFields();
  formRef.value?.clearValidate();
  formEntity.value = formInitialValue;
};

const onSave = () => {
  formRef.value.validate(valid => {
    if (valid) {
      emit("finish", toRaw(formEntity.value));
    }
  });
};

defineExpose({ loading: saveLoading });

watch(
  () => props.initialValue,
  val => {
    if (Object.keys(val).length) {
      formEntity.value = {
        ...formEntity.value,
        ...val
      };
    }
  },
  {
    deep: true
  }
);
</script>
