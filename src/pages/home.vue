<template>
  <div class="view">
    <top-fixed v-on:closetop="closeTopFixed"></top-fixed>
    <div id="content">
      <section data-group="1">
        <slide-banner></slide-banner>
        <tentrance v-on:clickpointqun="showPointQun"></tentrance>
        <div class="line3"></div>
        <div class="container">
          <div class="latestWebCourse">
            <div class="titleView">
              <span class="icon fl"></span>
              <span class="ttInfo fl">最新网课</span>
              <router-link class="moreP" to="/pointViewList">
                <span class="fr moreIcon"></span>
                <span class="moreInfo fr">更多</span>
              </router-link>
            </div>
            <div class="contentView">
              <course-list :course-list="latestCourse" :if-index="ifIndex" :if-point-url="'read'"></course-list>
              <ul class="imgCourseList">
                <li class="fl" v-for="(course,index) in latestCourse" v-if="index>1">
                  <a :href="'http://m.zfwx.com/pointlisten/index.html?courseId='+course.courseId">
                    <img :src="course.csImg">
                    <p class="courseTT forlve v-cloak">{{course.csName}}</p>
                    <div class="moreInfo">
                      <span class="person fl icons"></span><span class="fl no">{{course.csStudynum}}</span>
                      <span class="praise fl icons"></span><span class="fl no">{{course.csLike}}</span>
                      <span class="message fl icons"></span><span class="fl no">{{course.csCommentnum}}</span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="lvsuoWx">
            <div class="titleView">
              <span class="icon fl"></span>
              <span class="ttInfo fl">律所网校</span>
              <router-link class="moreP" to="/lvsuo">
                <span class="fr moreIcon"></span>
                <span class="moreInfo fr">更多</span>
              </router-link>
            </div>
            <div class="contentView">
              <lvsuo-list :lvsuo-list="lvsuoList"></lvsuo-list>
             <rank :rank-list="rankList"></rank>
            </div>
          </div>
          <div class="notice">
            <div class="titleView">
              <span class="icon fl"></span>
              <span class="ttInfo fl">通知公告</span>
              <router-link class="moreP" to="/msshowList">
                <span class="fr moreIcon"></span>
                <span class="moreInfo fr">更多</span>
              </router-link>
            </div>
            <div class="contentView">
              <mshow-course-list :mshow-list="mshowList"></mshow-course-list>
            </div>
          </div>
          <div class="trainDynamic">
            <div class="titleView">
              <span class="icon fl"></span>
              <span class="ttInfo fl">培训动态</span>
              <router-link class="moreP" to="/dynamicList">
                <span class="fr moreIcon"></span>
                <span class="moreInfo fr">更多</span>
              </router-link>
            </div>
            <div class="contentView">
              <dynamic-list :dynamic-list="dynamicList"  entry="home"></dynamic-list>
            </div>
          </div>
          <div class="stuVoice">
            <div class="titleView">
              <span class="icon fl"></span>
              <span class="ttInfo fl">学员心声</span>
              <span class="subttInfo fl">我学习我快乐</span>
              <!--<p class="moreP">-->
                <!--<span class="fr moreIcon"></span>-->
                <!--<span class="moreInfo fr">更多</span>-->
              <!--</p>-->
            </div>
            <div class="contentView">
              <ul class="voiceList">
                <li v-for="item in commentList">
                  <div class="imgContainer fl">
                    <img :src="item.photoUrl" alt="">
                  </div>
                  <div class="voiceInfo">
                    <p class="commentInfo forlve">{{item.content}}</p>
                    <p class="studenLabel"><span class="stuName fl">{{item.realName}}</span><span class="position fl">{{item.commentTime|time}}</span></p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="bottomDiv">
              <div class="openSchool" @click="showOpenSchoolForm">
                <span class="openIcon fl"></span>
                <p>我要开网校</p>
              </div>
          </div>
          <a href="" name="openMao"></a>
          <div class="openWebSchool" v-show="ifShowOpen">
            <a href="#1" id="openMao"></a>
            <div class="steps"></div>
            <div class="openForm">
              <div class="fromTT">信息填写</div>
              <div class="fromCon">
                <div class="inputGroup">
                  <input type="text" placeholder="机构名称" v-model="orgData.aorganization" @input="handleOrgName">
                  <span class="errorMsg" v-if="results.aorganization" v-cloak>{{results.aorganization}}</span>
                </div>
                <div class="inputGroup">
                  <input type="text" placeholder="机构地址" v-model="orgData.aAddress" @input="handleOrgAddress" >
                  <span class="errorMsg" v-if="results.aAddress" v-cloak>{{results.aAddress}}</span>
                </div>
                <div class="inputGroup">
                  <input type="text" placeholder="经办人姓名" v-model="orgData.aContact" @input="handleorgUsername" >
                  <span class="errorMsg" v-if="results.aContact" v-cloak>{{results.aContact}}</span>
                </div>
                <div class="inputGroup">
                  <input type="text" placeholder="联系方式" v-model="orgData.aTel" @input="handleOrgMobile" >
                  <span class="errorMsg" v-if="results.aTel" v-cloak>{{results.aTel}}</span>
                </div>
              </div>
            </div>
            <div class="permission">
              <div class="permissionTT">许可条款</div>
              <div class="permissionCon">
                <div class="clauseLink">
                  <span class="checkIcon fl" v-show="ifAgree" @click="agreeClause"></span>
                  <span class="notAgree fl" v-show="!ifAgree" @click="agreeClause"></span>
                  <p class="info fl">我接受许可条款</p>
                  <p class="clausesBtn fr" @click="showClause">条款全文></p>
                </div>
                <span class="applyOpenBtn" @click="applyOpenSchool">申请开通</span>
              </div>
            </div>
          </div>
          <div class="clauseContain" id="clauseContain">
            <div class="clauseInfo">
              <h5>服务条款</h5> <span class="closeClause fr" @click="closeClause" v-show="ifShowClause">[关闭]</span>
              <p class="clauseTT"><strong>1.本服务条款是用户（您）与点睛政法网络学堂(简称点睛)的协议。</strong></p>
              <p class="clauseItem">1.1 重要须知：点睛在此特别提醒，用户（您）欲访问和使用点睛网，必须事先认真阅读本服务条款中各条款， 包括免除或者限制点睛责任的免责条款及对用户的权利限制。请您审阅并接受或不接受本服务条款（未成年人审阅时应得到法定监护人的陪同）。如您不同意本服务条款及/或随时对其的修改，您应不使用或主动取消点睛网提供的服务。您的使用行为将被视为您对本服务条款全部的完全接受，包括接受点睛教育对服务条款随时所做的任何修改。</p>
              <p class="clauseItem">1.2 这些条款可由点睛教育随时更新，且毋须另行通知。点睛教育服务条款(以下简称“服务条款”)一旦发生变更, 点睛教育将在网页上公布修改内容。修改后的服务一旦在网页上公布即有效代替原来的服务条款。您可随时登陆点睛教育网查阅最新版服务条款。</p>
              <p class="clauseItem">1.3 点睛教育目前经由其产品服务组合，向用户提供丰富的网上及线下资源及诸多产品与服务，包括但不限于各种信息通讯工具、即时通信软件或服务、电子邮件、网上论坛、聊天室、线上游戏、电信增值服务等（以下简称“服务”或“本服务”）。本服务条款适用于点睛教育提供的各种服务，但当您使用点睛教育某一特定服务时，如该服务另有单独的服务条款、指引或规则，您应遵守本服务条款及点睛教育随时公布的与该服务相关的服务条款、指引或规则等。前述所有的指引和规则，均构成本服务条款的一部分。除非本服务条款另有其他明示规定，新推出的产品或服务、增加或强化目前本服务的任何新功能，均受到本服务条款之规范。</p>

              <p class="clauseTT"><strong>2 用户使用规则</strong></p>
              <p class="clauseItem">2.1 用户必须自行配备上网和使用电信增值业务所需的设备，自行负担个人上网或第三方（包括但不限于电信或移动通信提供商）收取的通讯费、信息费等有关费用。如涉及电信增值服务的，我们建议您与您的电信增值服务提供商确认相关的费用问题。</p>
              <p class="clauseItem">2.2 除您与点睛网站另有约定外，您同意本服务仅供个人使用且非商业性质的使用，您不可对本服务任何部分或本服务之使用或获得（包括但不限于QQ号码），进行复制、拷贝、出售、或利用本服务进行调查、广告、或用于其他商业目的，其中，您不得将任何广告信函与信息、促销资料、垃圾邮件与信息、滥发邮件与信息、直销及传销邮件与信息以短信、即时通信或以其他方式传送，但点睛网站对特定服务另有适用指引或规则的除外。</p>
              <p class="clauseItem">2.3 不得发送任何妨碍社会治安或非法、虚假、骚扰性、侮辱性、恐吓性、伤害性、破坏性、挑衅性、庸俗性、淫秽色情性等内容的信息。</p>
              <p class="clauseItem">2.4 保证自己在使用各服务时用户身份的真实性和正确性及完整性，如果资料发生变化，您应及时更改。在安全完成本服务的登记程序并收到一个密码及帐号后，您应维持密码及帐号的机密安全。您应对任何人利用您的密码及帐号（包括但不限于QQ号码，QQ号的捆绑手机号码等）所进行的活动负完全的责任，点睛网站无法对非法或未经您授权使用您帐号及密码的行为作出甄别，因此点睛教育不承担任何责任。在此，您同意并承诺做到∶</p>
              <p class="clauseItem">2.4.1 当您的密码或帐号遭到未获授权的使用，或者发生其他任何安全问题时，您会立即有效通知到点睛网站；且</p>
              <p class="clauseItem">2.4.2 当您每次上网或使用其他服务完毕后，会将有关帐号等安全退出。</p>
              <p class="clauseItem">2.5 用户同意接受点睛教育通过电子邮件、即时通信的客户端、网页或其他合法方式向用户发送商品促销或其他相关商业信息。在使用电信增值服务的情况下，　用户同意接受本网站及合作公司通过增值服务系统或其他方式向用户发送的相关服务信息或其他信息，其他信息包括但不限于通知信息、宣传信息、广告信息等。</p>
              <p class="clauseItem">2.6 关于在点睛教育张贴的公开信息：</p>
              <p class="clauseItem">2.6.1 您同意您在本服务公开使用区域或服务项目内张贴之内容，包括但不限于照片、图形或影音资料等内容，授予点睛教育全球性、免许可费、非独家、可完全转授权、及永久有效的使用权利，点睛教育可以为了展示、散布及推广张贴前述内容之特定目的，将前述内容复制、修改、改写、改编或出版及可供点睛教育转载手机使用。</p>
              <p class="clauseItem">2.6.2 对您张贴的内容，您保证已经拥有必要权利或授权以进行该内容提供、张贴、上载、提交等行为。</p>
              <p class="clauseItem">2.6.3 若您违反有关法律法规及本服务条款的规定了，须自行承担完全的法律责任，并承担因此给点睛网站造成的损失的法律责任。</p>
              <p class="clauseItem">2.7 关于收费服务</p>
              <p class="clauseItem">2.7.1 点睛教育的某些服务是以收费方式提供的。一旦您本人或他人（包括您的代理）通过个人帐户订阅收费服务，您应按有关的收费标准、付款方式支付相关服务费及其他费用。资费说明标明在点睛教育网站相应服务的相应页面上。您可以通过我们的客户服务中心选择取消相关付费服务。在您正式取消相关服务并经点睛教育批准前，我们将按相关服务的收费标准与方式继续收费。</p>
              <p class="clauseItem">2.7.2 逾期付费：服务费之逾期交纳应按点睛网站或合作公司关于迟延付费的相应规定办理。</p>
              <p class="clauseItem">2.8 依本服务条款所取得的服务权利不可转让。</p>
              <p class="clauseItem">2.9 遵守国家的有关法律、法规和行政规章制度。</p>
              <p class="clauseItem">2.10 如用户违反国家法律法规或本服务条款，点睛网站和合作公司将有权停止向用户提供服务而不需承担任何责任，如导致点睛教育或合作公司遭受任何损害或遭受任何来自第三方的纠纷、诉讼、索赔要求等，用户须向点睛网站或合作公司赔偿相应的损失，用户并需对其违反服务条款所产生的一切后果负全部法律责任。</p>

              <p class="clauseTT"><strong>3 服务风险及免责声明</strong></p>
              <p class="clauseItem">3.1 用户须明白，本服务仅依其当前所呈现的状况提供，本服务涉及到互联网及移动通讯等服务，可能会受到各个环节不稳定因素的影响。因此服务存在因上述不可抗力、计算机病毒或黑客攻击、系统不稳定、用户所在位置、用户关机、GSM网络、互联网络、通信线路原因等造成的服务中断或不能满足用户要求的风险。开通服务的用户须承担以上风险，点睛网站和合作公司对服务之及时性、安全性、准确性不作担保，对因此导致用户不能发送和接受阅读消息、或传递错误，个人设定之时效、未予储存或其他问题不承担任何责任。</p>
              <p class="clauseItem">3.2 如点睛网站的系统发生故障影响到本服务的正常运行，点睛网站承诺在第一时间内与相关单位配合，及时处理进行修复。但用户因此而产生的经济损失，点睛网站和合作公司不承担责任。此外，点睛教育保留不经事先通知为维修保养、升级或其他目的暂停本服务任何部分的权利。</p>
              <p class="clauseItem">3.3 点睛网站在此郑重提请您注意，任何经由本服务以上载、张贴、发送即时信息、电子邮件或任何其他方式传送的资讯、资料、文字、软件、音乐、音讯、照片、图形、视讯、信息、用户的登记资料或其他资料（以下简称“内容”），无论系公开还是私下传送，均由内容提供者承担责任。点睛网站无法控制经由本服务传送之内容，也无法对用户的使用行为进行全面控制，因此不保证内容的合法性、正确性、完整性、真实性或品质；您已预知使用本服务时，可能会接触到令人不快、不适当或令人厌恶之内容，并同意将自行加以判断并承担所有风险，　而不依赖于点睛网站。但在任何情况下，点睛网站有权依法停止传输任何前述内容并采取相应行动，包括但不限于暂停用户使用本服务的全部或部分，保存有关记录，并向有关机关报告。但点睛网站有权(但无义务)依其自行之考量，拒绝和删除可经由本服务提供之违反本条款的或其他引起点睛网站或其他用户反感的任何内容。</p>
              <p class="clauseItem">3.4 关于使用及储存之一般措施：　您承认关于本服务的使用点睛教育有权制订一般措施及限制，包含但不限于本服务将保留用户信息、电子邮件信息、所张贴内容或其他上载内容之最长期间、本服务一个帐号当中可收发电子邮件或短信讯息等的最大数量、本服务一个帐号当中可收发的单个信息或电子邮件的大小、点睛教育服务器为您分配的最大使用空间，以及一定期间内您使用本服务之次数上限（及每次使用时间之上限）。通过本服务存储或传送之任何信息、通讯资料和其他内容，如被删除或未予储存，您同意点睛教育毋须承担任何责任。您亦同意，长时间未使用的帐号，点睛教育有权关闭并收回帐号。您也同意，点睛教育有权依其自行之考量，不论通知与否，随时变更这些一般措施及限制。</p>
              <p class="clauseItem">3.5 与广告商进行之交易 : 您通过本服务与广告商进行任何形式的通讯或商业往来，或参与促销活动，包含相关商品或服务之付款及交付，以及达成的其他任何相关条款、条件、保证或声明，完全为您与广告商之间之行为。除有关法律有明文规定要求点睛教育承担责任以外，您因前述任何交易或前述广告商而遭受的任何性质的损失或损害，点睛教育均不予负责。</p>
              <p class="clauseItem">3.6 链接及搜索引擎服务： 本服务或第三人可提供与其他国际互联网上之网站或资源之链接。由于点睛教育无法控制这些网站及资源，您了解并同意：无论此类网站或资源是否可供利用，点睛教育不予负责；点睛教育亦对存在或源于此类网站或资源之任何内容、广告、产品或其他资料不予保证或负责。因您使用或依赖任何此类网站或资源发布的或经由此类网站或资源获得的任何内容、商品或服务所产生的任何损害或损失，点睛教育不负任何直接或间接之责任。若您认为该链接所载的内容或搜索引擎所提供之链接的内容侵犯您的权利，点睛教育声明与上述内容无关，不承担任何责任。点睛教育建议您与该网站或法律部门联系，寻求法律保护；若您需要更多了解点睛教育之搜索服务，请参见点睛教育关于搜索引擎服务的相关说明。</p>

              <p class="clauseTT"><strong>4 服务变更、中断或终止及服务条款的修改</strong></p>
              <p class="clauseItem">4.1 本服务的所有权和运作权、一切解释权归点睛网站。点睛网站提供的服务将按照其发布的章程、服务条款和操作规则严格执行。</p>
              <p class="clauseItem">4.2 点睛网站有权在必要时修改服务条款，服务条款一旦发生变动，将会在相关页面上公布修改后的服务条款。如果不同意所改动的内容，用户应主动取消此项服务。如果用户继续使用服务，则视为接受服务条款的变动。</p>
              <p class="clauseItem">4.3 点睛网站和合作公司有权按需要修改或变更所提供的收费服务、收费标准、收费方式、服务费、及服务条款。点睛网站在提供服务时，可能现在或日后对部分服务的用户开始收取一定的费用如用户拒绝支付该等费用，则不能在收费开始后继续使用相关的服务。但点睛网站和合作公司将尽最大努力通过电邮或其他有效方式通知用户有关的修改或变更。</p>
              <p class="clauseItem">4.4 点睛网站特别提请用户注意，点睛网站为了保障公司业务发展和调整的自主权，点睛网站拥有经或未经事先通知而修改服务内容、中断或中止部分或全部服务的权利，修改会以通告形式公布于点睛网站相关页面上，一经公布视为通知。 点睛网站行使修改或中断服务的权利而造成损失的，点睛网站不需对用户或任何第三方负责。</p>
              <p class="clauseItem">4.5 如发生下列任何一种情形，点睛网站有权随时中断或终止向用户提供服务而无需通知用户：</p>
              <p class="clauseItem">4.5.1 用户提供的个人资料不真实；</p>
              <p class="clauseItem">4.5.2 用户违反本服务条款的规定；</p>
              <p class="clauseItem">4.5.3 按照主管部门的要求；</p>
              <p class="clauseItem">4.5.4 其他点睛网站认为是符合整体服务需求的特殊情形。</p>


              <p class="clauseTT"><strong>5 隐私权保护：</strong></p>
              <p class="clauseItem">5.1 点睛网站重视对用户隐私的保护，保护隐私是点睛网站的一项基本政策。您提供的登记资料及点睛网站保留的有关您的若干其他个人资料将受到中国有关隐私的法律和点睛网站《隐私保护声明》之规范。</p>
              <p class="clauseItem">5.2 您使用点睛网站服务时，点睛网站有权用数字代码、通用唯一标识符、cookies或其他技术确定进入服务的计算机。点睛网站有可能利用所得信息对服务的使用进行总体性及匿名的数据统计及分析，　所得数据可供点睛网站或其合作人使用。　计算机识别技术也会用于执行相关的服务条款。</p>
              <p class="clauseItem">5.3 点睛网站可能会与第三方合作向用户提供相关的服务，如该第三方为合法经营的公司且提供同等的用户隐私保护（如电信运营商），点睛网站有权将用户的注册资料等提供给该第三方。</p>


              <p class="clauseTT"><strong>6 点睛网站商标信息</strong></p>
              <p class="clauseItem">6.1 点睛网站logo等，以及其他点睛网站标志及产品、服务名称，均为点睛网站之商标（以下简称“点睛网站标识”）。未经点睛网站事先书面同意，您不得将点睛网站标记以任何方式展示或使用或作其他处理，也不得向他人表明您有权展示、使用、或其他有权处理点睛网站标识的行为。</p>


              <p class="clauseTT"><strong>7 信息内容的所有权</strong></p>
              <p class="clauseItem">7.1 点睛网站定义的信息内容包括：文字、软件、声音、相片、录像、图表；广告中全部内容；点睛网站为用户提供的商业信息。所有这些内容受版权、商标权、和其它知识产权和所有权法律的保护。所以，用户只能在点睛网站和相关权利人授权下才能使用这些内容，而不能擅自使用、抄袭、复制、修改、编撰这些内容、或创造与内容有关的衍生产品。</p>
              <p class="clauseItem">7.2 关于点睛网站提供的软件：您了解并同意，本服务及本服务所使用或提供之相关软件（以下简称“软件”）（但不包括两用户之间直接传递的资料）是由点睛网站拥有所有相关知识产权及其他法律保护之专有之知识产权（包括但不限于版权、商标权、专利权、及商业秘密）资料。若就某一具体软件存在单独的最终用户软件授权协议，您除应遵守本协议有关规定外，亦应遵守该软件授权协议。　除非您亦同意该软件授权协议，否则您不得安装或使用该软件。对于未提供单独的软件授权协议的软件，　除您应遵守本服务协议外，点睛网站或所有权人仅将为您个人提供可取消、不可转让、非专属的软件授权许可，　并仅为访问或使用本服务之目的而使用该软件。此外，在任何情况下，未经点睛网站明示授权，您均不得修改、出租、出借、出售、散布本软件之任何部份或全部，或据以制作衍生著作，或使用擅自修改后的软件，或进行还原工程、反向编译，或以其他方式发现原始编码，包括但不限于为了未经授权而使用本服务之目的。您同意将通过由点睛网站所提供的界面而非任何其他途径使用本服务。</p>

              <p class="clauseTT"><strong>8 法律</strong></p>
              <p class="clauseItem">8.1 本服务条款要与国家相关法律、法规一致，如发生服务条款与相关法律、法规条款有相抵触的内容，抵触部分以法律、法规条款为准。</p>


              <p class="clauseTT"><strong>9 保障</strong></p>
              <p class="clauseItem">9.1 用户同意保障和维护点睛网站全体成员的利益，负责支付由用户使用超出服务范围引起的一切费用（包括但不限于：律师费用、违反服务条款的损害补偿费用以及其它第三人使用用户的电脑、帐号和其它知识产权的追索费）。</p>
              <p class="clauseItem">9.2 用户须对违反国家法律规定及本服务条款所产生的一切后果承担法律责任。</p>

              <p class="clauseTT"><strong>10 其它</strong></p>
              <p class="clauseItem">10.1 如本服务条款中的任何条款无论因何种原因完全或部分无效或不具有执行力，本服务条款的其余条款仍应有效且具有约束力，并且努力使该规定反映之意向具备效力。</p>
              <p class="clauseItem">10.2 本服务条款构成您与点睛网站之全部协议，规范您对本服务之使用，并取代您先前与点睛网站达成的全部协议。但在您使用相关服务、或使用第三方提供的内容或软件时，亦应遵从所适用之附加条款及权利。</p>
              <p class="clauseItem">10.3 每项服务的内容、收费标准、收费方式、服务费及服务条款应以最后发布的通知为准。</p>
              <p class="clauseItem">10.4 用户对服务之任何部分或本服务条款的任何部分之意见及建议可通过客户服务部门与点睛网站联系。</p>

              <p class="clauseTT"><strong>©点睛网站保留本服务条款之解释权。</strong></p>

            </div>
          </div>
        </div>
      </section>
    </div>
    <footer-fixed :footer-index="0"></footer-fixed>
    <div class="fixed-background"v-show="ifPointQunClicked||ifShowApplyInfo" @click="closeWindow"></div>
    <div class="pointqun" v-if="ifPointQunClicked">
      <div class="windowInfo">
        <p>请下载App体验更多功能与服务！</p>
      </div>
      <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.dj.zfwx.client.activity">立即下载App</a>
    </div>
    <div class="applyOpenWin" v-if="ifShowApplyInfo">
      <div class="applyInfo">
        <h5>您的申请已经受理！</h5>
        <p>我们的工作人员将在7个工作日内处理您的申请，请耐心等待哦！</p>
      </div>
      <span class="sureBtn" @click="closeForm">确定</span>
    </div>
  </div>

</template>
<script>
    import TopFixed from '../components/TopFixed.vue'
    import SlideBanner from '../components/SlideBanner.vue'
    import Tentrance from '../components/Tentrance.vue'
    import CourseList from '../components/CourseList.vue'
    import LvsuoList from '../components/LvsuoList.vue'
    import Rank from '../components/Rank.vue'
    import MshowCourseList from '../components/MshowCourseList.vue'
    import DynamicList from '../components/DynamicList.vue'
    import FooterFixed from '../components/FooterFixed.vue'

    var telReg=/^1[3|4|5|7|8][0-9]{9}$/;
    export default{
        data(){
            return {
              ifIndex:true,//是否首页
              latestCourse:[],//最新网课
              lvsuoList:[],//律所网校
              rankList:[],//排行榜
              mshowList:[],//面授
              commentList:[],//评论
              dynamicList:[],//动态
              orgData:{
                aEmail:"123456@163.com",
                aorganization:"",
                aAddress:"",
                aContact:"",
                aTel:""
              },
              results:{
                aorganization:false,
                aAddress:false,
                aContact:false,
                aTel:false
              },
              ifPointQunClicked:false,
              ifShowOpen:false,
              ifShowClause:false,
              ifShowApplyInfo:false,
              footerIndex:0,
              ifAgree:true,
              index:0
            }
        },
        methods:{
            closeTopFixed:function(){
              /* global $ */
            var $clauseContain=$("#clauseContain")
            var $content=$("#content")
            $clauseContain.css("top","0")
              $content.css("marginTop","0")
          },
            showPointQun:function(){
                this.ifPointQunClicked=true
            },
            closeWindow:function(){
                this.ifPointQunClicked=false
                this.ifShowApplyInfo=false
            },
            closeForm:function(){
            this.ifPointQunClicked=false
            this.ifShowApplyInfo=false
            this.ifShowOpen=false
          },
            showOpenSchoolForm:function(){
              /* global $ */
              this.ifShowOpen=true;
                var height= document.getElementById("footer-fixed").offsetTop;
                var $view=$("html,body")
                $view.animate({'scrollTop':height+'00px'});
            },
            showClause:function(){
              /* global $ */
              this.ifShowClause=true;
                var clientWidth=document.documentElement.clientWidth;
                var $clauseContain= $("#clauseContain");
                var topShow=sessionStorage.getItem("topShow")
                if(null==topShow||topShow=="true"){
                  $clauseContain.animate({width:clientWidth+'px',paddingLeft:0.267+'rem',paddingRight:0.267+'rem'})
                }else{
                  $clauseContain.animate({width:clientWidth+'px',paddingLeft:0.267+'rem',paddingRight:0.267+'rem',top:"0"})

                }
            },
            agreeClause:function(){
                var ctx=this;
                ctx.ifAgree=!ctx.ifAgree;
            },
            applyOpenSchool:function(){
                var ctx=this;
                if(ctx.valid){
                    for(var key in ctx.orgData){
                        if(ctx.orgData[key]==""){
                            alert("请补全表单内容")
                            return
                        }
                    }
                    if(ctx.ifAgree){
                      ctx.$http.jsonp("https://base.zfwx.com/joinLecturer.do",{
                          params:ctx.orgData,
                          jsonp:'jsonpCallback'
                        }).then(function(res){
                          if(res.body.status=="success"){
                            ctx.ifShowApplyInfo=true

                          }

                      },function(){
                      });

                    }else{
                      alert("请先接受许可条款")
                    }

                }else if(!ctx.ifAgree){
                  alert("请先接受许可条款")
                }else{
                    return ;
                }
            },
            closeClause:function(){
              /* global $ */
              this.ifShowClause=false;
               var  $clauseContain= $("#clauseContain");
                $clauseContain.animate({width:'0px',paddingLeft:'0',paddingRight:'0'})
            },
            handleOrgName:function(e){
                var ctx=this;
               if(ctx.orgData.aorganization.trim()==""){
                 ctx.results.aorganization="请输入机构名称"
               }else{
                 ctx.results.aorganization=false
               }
            },
            handleOrgAddress:function(e){
              var ctx=this;
              if(ctx.orgData.aAddress.trim()==""){
                ctx.results.aAddress="请输入机构地址"
              }else{
                ctx.results.aAddress=false
              }
            },
            handleorgUsername:function(e){
              var ctx=this;
              if(ctx.orgData.aContact.trim()==""){
                ctx.results.aContact="请输入经办人姓名"
              }else{
                ctx.results.aContact=false
              }
            },
            handleOrgMobile:function(e){
              var ctx=this;
              if(ctx.orgData.aTel.trim()==""){
                ctx.results.aTel="请输入联系方式"
              }else{
                  if(!telReg.test(ctx.orgData.aTel)){
                    ctx.results.aTel="手机号格式不正确"
                  }else {
                    ctx.results.aTel = false
                  }
              }
            }
        },
        computed:{
            valid:function(){
                var results=this.results;
                for(let key in results){
                    if(results[key]){
                        return false
                    }
                }
                return true
            }
        },
        mounted:function(){
          /* global $ */
            var $content=$("#content")
            var topShow=sessionStorage.getItem("topShow")
            if(null==topShow||topShow=="true"){
                  $content.css("marginTop","100px")
            }

              var ctx=this;
            /*最新网课*/
            ctx.$http.get(URL+"/findcs.json?domain=0&pageNo=1&pageSize=4&type=2&csType=0&isFirm=1").then(response=>{
               ctx.latestCourse=response.body.list;
            },response=>{})
            /*律所网校*/
            ctx.$http.get(URL+"/findlawyerfirm.json?domain=0&pageNo=1&pageSize=4&orderBy='id'").then(response=>{
              ctx.lvsuoList=response.body.result.data;
            },response=>{})
            /*排行榜*/
            ctx.$http.get(URL+"/findlawyerfirm.json?domain=0&pageNo=1&pageSize=10&orderBy='id'").then(response=>{
            ctx.rankList=response.body.result.data;
            },response=>{})
            /*面授*/
            ctx.$http.get(URL+"/getFacetofaces.json?domain=0&pageNo=1&pageSize=3&orgType=3").then(response=>{
              ctx.mshowList=response.body.result.data;
               },response=>{})
            /*评论*/
            ctx.$http.get(URL+"/getCourseComments.json?domain=0&pageNo=1&pageSize=3").then(response=>{
              ctx.commentList=response.body.result.data;
            },response=>{})
          /*动态*/
          ctx.$http.get(URL+"/getDjLXNotices.json?domain=0&pageNo=1&pageSize=3").then(response=>{
            ctx.dynamicList=response.body.result.data;
        },response=>{})
          },
        components:{
            TopFixed,
            SlideBanner,
            Tentrance,
            CourseList,
            LvsuoList,
            Rank,
            MshowCourseList,
            DynamicList,
            FooterFixed
        }
    }

</script>
<style scoped>
  body{max-width:1242px;min-width: 320px;margin:0 auto;font-family: "微软雅黑", "宋体", Arial, sans-serif}
  .view{width:10rem;overflow: auto;position: relative;margin:0 auto}
  #content{position: relative;width:100%;margin-bottom:1.33rem;}
  #content>section>div{position: relative;width:100%;overflow: hidden}
  .titleView{width:10rem;height:0.814rem;padding:0 0.213rem;background-color: #fff}
  .titleView span.icon{display: inline-block;width: 0.2rem;height:100%; background: url(../assets/imgs/sideIcon.png) no-repeat center center;background-size:100%;}
  .titleView span.ttInfo{display: inline-block;color:#2ad5ff;font-size:0.4rem;line-height:0.814rem;margin-left:10px;}
  .titleView span.subttInfo{display: inline-block;color:#00ccff;font-size:0.35rem;line-height:0.814rem;margin-left:20px;font-family: "华文楷体"}
  .titleView .moreP{display:block;overflow: hidden;height:100%}
  .titleView .moreP span{display:block;}
  .titleView .moreP span.moreIcon{width:0.4rem;height:0.4rem;margin-top:0.207rem;background:url("../assets/imgs/moreThan.png")no-repeat center center #baf1ff;background-size:100%;color:#fff;border-radius: 50%}
  .titleView .moreP span.moreInfo{color:#acacac;line-height:0.814rem;font-size:0.3rem;margin-right:0.15rem;}
  .contentView{width:100%;padding:0.333rem 0.267rem;overflow: auto}

  .imgCourseList{width:100%;height:4.4rem;padding:0.267rem 0 0 0.32rem;background-color: #fff}
  .imgCourseList li{width:4.25rem;height:100%;margin-right:0.32rem;}
  .imgCourseList img{width:100%;height:2.7rem;}
  .imgCourseList p.courseTT{width:100%;height:0.57rem;color:#333;font-size:0.35rem;}
  .imgCourseList .moreInfo{width:100%;height:0.5rem;color:#acacac;font-size:0.3rem;font-family:'';display: flex;justify-content:space-around}
  .imgCourseList .moreInfo span.icons{display:block;width:25px;height:60px;background: url("../assets/imgs/icons.png") no-repeat center center;line-height:60px;}
  .imgCourseList .moreInfo span.no{display:block;padding-right:0.2rem;height:60px;line-height:60px;}
  .imgCourseList .moreInfo span.person{background-position:-50px 8px;}
  .imgCourseList .moreInfo span.praise{background-position:-3px -40px}
  .imgCourseList .moreInfo span.message{background-position:-51px -38px}
  .voiceList{overflow: auto;background-color: #fff;padding-top:0.32rem;}
  .voiceList li{height:1.52rem;width:100%;padding:0 0.4rem;}
  .voiceList li .imgContainer{height:100%;width:0.9rem;}
  .voiceList li .imgContainer img{height:0.92rem;width:0.9rem;border-radius: 50%}
  .voiceList li .voiceInfo{overflow: hidden;padding-left:0.2rem;}
  .voiceList li .voiceInfo .commentInfo{font-size:0.4rem;color:#898989;margin-bottom:0.1rem;}
  .voiceList li .voiceInfo .stuName{font-size:0.3rem;color:#acacac;margin-right:0.5rem;}
  .voiceList li .voiceInfo .position{font-size:0.3rem;color:#acacac;font-family:'fzlantingheis-r-gbregular'}
  .bottomDiv{width:5.9rem;height:1rem;margin:0 auto;display: flex;justify-content: space-around}
  .bottomDiv .openIcon{display:block;width:0.7rem;height:0.7rem;background: url("../assets/imgs/open.png") no-repeat center center;background-size: contain}
  .bottomDiv .openSchool p{overflow: hidden;color:#4fc1e9;font-size:0.3rem;line-height:0.7rem;padding-left:0.2rem;}

  .openWebSchool{width:100%;padding:0 0.24rem;margin-bottom:2.3rem;overflow: auto;background-color: #ececec}
  .openWebSchool .steps{width:100%;height:0.8rem;background: url("../assets/imgs/openSchoolSteps.png") no-repeat center center;background-size: contain}
  .openWebSchool .openForm{width:100%;height:5.227rem;margin:0.267rem 0;background-color: #fff}
  .openWebSchool .openForm .fromTT{width:100%;padding-left:0.467rem;height:1.16rem;line-height:1.16rem;font-size:0.32rem;border-bottom:1px solid #ecedee;color:#acacac}
  .openWebSchool .openForm .fromCon{width:100%;padding:0 0.2rem;height:4.067rem;}
  .openWebSchool .openForm .fromCon .inputGroup{position:relative;width:100%;padding-top:0.227rem;height:0.88rem;}
  .openWebSchool .openForm .fromCon .inputGroup input{width:100%;height:0.653rem;border:none;outline: none;background-color: #f4f4f4;border-radius:10px;font-size:0.373rem;padding-left:0.267rem;color:#7d7d7d}
  .openWebSchool .permission{height:4.894rem;width:100%;background-color: #fff;}
  .openWebSchool .permission .permissionTT{height:1.12rem;line-height:1.12rem;width:100%;padding-left:0.467rem;font-size:0.32rem;border-bottom:1px solid #ecedee;color:#acacac}
  .openWebSchool .permission .permissionCon{height:3.774rem;width:100%}
  .openWebSchool .permission .permissionCon .clauseLink{height:1.6rem;width:100%;padding:0 0.533rem 0 0.44rem}
  .openWebSchool .permission .permissionCon .clauseLink .checkIcon{display:block;height:100%;width:1rem;background: url("../assets/imgs/checked.png") no-repeat center center;-moz-background-size: contain}
  .openWebSchool .permission .permissionCon .clauseLink .notAgree{display:block;height:1rem;width:1rem;margin-top:0.4rem;border-radius:50%;border:2px solid #dadada}
  .openWebSchool .permission .permissionCon .clauseLink  p.info{width:2.88rem;height:100%;line-height:1.6rem;text-align:center;font-size:0.32rem;color:#acacac}
  .openWebSchool .permission .permissionCon .clauseLink  p.clausesBtn{width:1.693rem;height:100%;line-height:1.6rem;text-align:center;font-size:0.32rem;color:#acacac}
  .openWebSchool .permission .permissionCon .applyOpenBtn{display:block;width:4.72rem;height:0.973rem;margin:0.293rem auto 0;line-height: 0.973rem;text-align:center;font-size:0.4rem;color:#999999;border:4px solid #cccccc;border-radius: 10px;}
  .clauseContain{position: fixed;width:0;background-color:#cccccc;top:100px;right:0;bottom:85px;z-index:1}
  .clauseContain .clauseInfo{position:relative;width:100%;padding:0 0.2rem 0.2rem;background-color:#fff;height:100%;overflow: scroll; -webkit-overflow-scrolling:touch;-moz-overflow-scrolling:touch;-o-overflow-scrolling:touch}
  .clauseContain .clauseInfo h5{width:100%;height:1.48rem;line-height:1.48rem;text-align:center;font-size: 0.427rem;color:#333}
  .clauseContain .clauseInfo .clauseTT{line-height:0.55rem;font-size:20px;color:#333}
  .clauseContain .clauseInfo .clauseItem{line-height:0.5rem;font-size:18px;color:#322d29}
  .clauseInfo span.closeClause{position: absolute;top:10px;right:10px;width:1.5rem;height:0.7rem;line-height:0.7rem;text-align:center;font-size:0.4rem;}
  .fromCon .inputGroup .errorMsg{display:block;position:absolute;top:0.347rem;right:10px;font-size:0.373rem;color:red}

  /*点群*/
  .fixed-background{position: fixed;width:100%;top:0;bottom:0;background-color: rgba(0,0,0,0.2);z-index:3}
  .pointqun{position: fixed;margin:auto;left:0;right:0;bottom:0;top:0;width:7.267rem;height:3.533rem;background-color:#fff;z-index:4}
  .pointqun .windowInfo{width:100%;height:2.44rem;border-bottom:2px solid #d9d9d9;padding:0.627rem 0.933rem 0;}
  .pointqun .windowInfo p{width:100%;font-size:0.453rem;text-align:center;color:#4f4f4f}
  .pointqun a{display:block;width:100%;height:1.093rem;line-height:1.093rem;font-size:0.453rem;text-align:center;color:#368df3}
  .applyOpenWin{position: fixed;margin:auto;left:0;right:0;bottom:0;top:0;width:7.2rem;height:3.52rem;background-color:#fff;z-index:4}
  .applyOpenWin .applyInfo{height:2.4rem;width:100%;background-color:#fff;border-bottom:2px solid #d9d9d9}
  .applyOpenWin .applyInfo h5{width:100%;height:0.8rem;line-height:0.8rem;margin-top:0.373rem;text-align:center;font-size:0.453rem;color:#4f4f4f}
  .applyOpenWin .applyInfo p{width:100%;padding:0 0.773rem;text-align:center;font-size:0.347rem;color:#666}
  .applyOpenWin .sureBtn{display:block;width:100%;text-align:center;font-size:0.453rem;color:#368df3}



</style>
