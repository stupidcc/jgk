/**
 * Created by djn5 on 2017/3/20.
 */
//引用模板
import home from '../pages/home.vue'
import lvsuoList from '../pages/lvsuoList.vue'
import pointPlayList from '../pages/pointPlayList.vue'
import pointReadList from '../pages/pointReadList.vue'
import pointReadListForLvsuo from '../pages/pointReadListForLvsuo.vue'
import pointViewList  from '../pages/pointViewList.vue'
import pointViewListForLvsuo  from '../pages/pointViewListForLvsuo.vue'
import dynamicList from '../pages/dynamicList.vue'
import chooseCourseForm  from '../pages/chooseCourseForm.vue'
import dynamicDetail  from '../pages/dynamicDetail.vue'
import msshowList from '../pages/msshowList.vue'
import msshowDetailed from '../pages/msshowDetailed.vue'
import lvsuoDetail from '../pages/lvsuoDetail.vue'
import dynamicListForLvsuo from '../pages/dynamicListForLvsuo.vue'//律所的动态列表
import msshowListForLvsuo from '../pages/msshowListForLvsuo.vue'//律所的面授列表
import dynamicDetailForLvsuo from '../pages/dynamicDetailForLvsuo.vue'//律所的面授列表

//配置路由
export default[
  {path:"/",component:home},
  {path:"/lvsuo",component:lvsuoList},
  {path:"/pointPlayList",component:pointPlayList},
  {path:"/pointReadList",component:pointReadList},
  {path:"/pointReadListForLvsuo/:id",component:pointReadListForLvsuo},
  {path:"/pointViewList",component:pointViewList},
  {path:"/dynamicList",component:dynamicList},
  {path:"/chooseCourseForm",component:chooseCourseForm},
  {path:"/dynamicDetail/:id",component:dynamicDetail},
  {path:"/dynamicDetailForLvsuo/:id/:lvsuoId",component:dynamicDetailForLvsuo},
  {path:"/msshowList",component:msshowList},
  {path:"/msshowDetailed/:id",component:msshowDetailed},
  {path:"/lvsuoDetail/:id",component:lvsuoDetail},
  {path:"/dynamicListForLvsuo/:id",component:dynamicListForLvsuo},
  {path:"/msshowListForLvsuo/:id",component:msshowListForLvsuo},
  {path:"/pointViewListForLvsuo/:id",component:pointViewListForLvsuo}
]
