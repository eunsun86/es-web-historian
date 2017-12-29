# Web Historian

이 스프린트에서는 인터넷 사이트를 보관하는 웹 서비스 인 <a href="http://archive.org">http://archive.org</a>의 일부를 다시 작성합니다. 
여러분의 버전에서는 사용자가 URL을 제출할 수있게되며, 인터넷을 통해 해당 웹 사이트의 복사본을 가져 와서 로컬 텍스트 파일에 저장하여 보관하고 복사본을 보여줍니다.

이 스프린트는 다양한 app 구성 요소를 연결하는 스프린트로서 기존의 소프트웨어 및 작성 코드에 많이 의존하는 것을 배웁니다.

## High Level Goals of this Sprint

  - 여러 서비스를 사용하는 app을 만나보고 개발 합니다.

  - JavaScript interpreter에서 실행되는 코드에 대한 이해를 높이고 그렇지 않은 코드와 함께 구성하는 방법에 대한 이해를 높입니다.

  - bare Node.js에 대한 이해와 스킬을 향상 시키십시오.

      - 잘 구성된 코드베이스를 지원하기 위해 `export`와 `require`문 사용하기

      - `fs` 모듈과 상호 작용

      - 웹 서버 작동 방식에 대한 이해를 돕기 위해 bare Node로 HTTP server routing 처리

      - Node.js 개발시 사용하는 callback pattern에 점점 더 익숙해지고 편안해지기. 특히 비동기 function을 연달아 handling하는 것에 익숙해지기


  - Promise에 대하여 알아보고 사용하여 비동기 code를 읽고 쓰기 쉽게 만듭니다.


## Key Concepts

다음 용어(term)는 이 스프린트에서 사용할 개념과 기술을 나타냅니다. 의미에 익숙해지고 이 스프린트에서 작업하는 동안 pair와 이 용어를 사용할 곳을 찾습니다.

  - **Host**: 네트워크에 연결된 컴퓨터를 종종 'Host'라고합니다. 이것은 일반적으로 컴퓨터의 'Host'정보 또는 서비스가 네트워크의 다른 시스템에서 사용되기 때문에 해당 기능과 상관없이 모든 네트워크 컴퓨터를 설명하는 데 사용됩니다.

  - **Client**: 상황에 따라 '클라이언트'는 서버 또는 소프트웨어가 실행되는 장치에서 사용할 수있는 서비스에 액세스하는 소프트웨어를 나타낼 수 있습니다. 서버가 다른 호스트에 있으면 클라이언트는 네트워크를 통해 액세스합니다.

  - **Server**: 상황에 따라 '서버'는 호스트에서 실행되는 소프트웨어('서비스')를 참조하거나 호스트 장치 자체를 나타낼 수 있습니다. 두 경우 모두 서버는 클라이언트의 요청을 받아들이고 작업을 대신 수행합니다.

      - 서버는 종종 제공하는 서비스로 분류됩니다. 예를 들어, 웹 서버는 웹 페이지를 제공하고 파일 서버는 컴퓨터 파일을 제공합니다.

      - 거의 모든 경우에 하나의 호스트는 많은 서비스를 동시에 실행합니다.

  - **Client/Server Model**: 클라이언트와 서버를 사용하는 응용 프로그램의 디자인을 말합니다. 서버는 하나 이상의 클라이언트에게 기능 또는 서비스를 제공하며, 이들 클라이언트는 해당 서비스에 대한 요청을 시작합니다.

      - 응용 프로그램의 클라이언트는 일반적으로 한 서버에서 서비스를 요청합니다.

      - 서버는 많은 클라이언트에게 서비스를 제공합니다.

      - 서버는 다른 서버와 통신하여 제공하지 않는 클라이언트 요청 (예: 데이터베이스 작업, 전자 메일 서비스, 인증 서비스)을 처리합니다.

      - 위의 예에서와 같이 서버 간 통신은 inter-server 또는 server-to-server 통신이라고도합니다.

      - 클라이언트와 서버는 동일한 컴퓨터에있을 수 있지만 대부분 다른 호스트에 있습니다. 개발자로서 우리는 코딩 작업을 진행하는 동안 종종 개발 워크 스테이션에서 애플리케이션의 서버 및 클라이언트 부분을 모두 실행합니다.

  - **Routing**: 서버가 받은 URL을 parse하여 해당 URL을 통해 사용자가 요청한 것이 무엇인지 파악하고 실행합니다. 개발자는 클라이언트에서 예상되는 URL 요청을 응답하고자 하는 특정 루틴에 매핑합니다.

      - **REST**: 간단하고 직관적이며 HTTP에 의존하는 'endpoints'( 'http://mystore/products/2'의 '/products/2'와 같은 URL의 호스트가 아닌 부분)를 사용하여 클라이언트 동일한 URL을 사용하여 요청을 보낼시 클라이언트 의도를 구별하는 동사 즉, 'products/2'는 HTTP 요청이 'DELETE', 'POST'또는 'GET'중 어떤 것을 지정하는지에 따라 제품을 삭제, 편집 또는 표시 할 수 있습니다.

  - **Background Jobs**: "뒤에서 작동하는" 프로세스. 중단없이 계속 진행할 수 있도록 기본 클라이언트/서버 작업과 별도로 문제를 해결하기 위해 새 프로세스를 "시작"할 수 있습니다. 우리는 백그라운드 작업을 사용하여 정해진 일정에 따라 유지 보수 또는 다른 작업을 실행합니다. 이것은 일반적으로 운영 체제 스크립트 및 다른 프로그래밍 언어에서 더 일반적이지만 JS의 최근 개발은 이 패턴을 따르는 web Workers와 같은 것을 제공합니다.

      - **daemon** (pronounced 'demon'): 
      백그라운드 작업을 처리하는 OS 프로세스 운영 체제, 요청을위한 서버라고 생각하십시오. 전통적으로 데몬 이름은 문자 d로 끝납니다. 예를 들어 syslogd는 시스템 로깅 기능을 구현하는 데몬이고 sshd는 들어오는 SSH 연결을 서비스하는 데몬입니다.

      - **Cron**: 운영 체제 작업 (명령 또는 쉘 스크립트)을 고정 된 시간, 날짜 또는 특정 간격으로 실행하도록 예약하는 데 사용되는 시간 기반 작업 스케줄러. cron 작업은 일반적으로 시스템 유지 관리 또는 관리를 자동화하는 데 사용되지만 정기적 인 간격으로 인터넷 연결 및 전자 메일 다운로드와 같은 작업에 사용할 수 있습니다.       


## Core Application

응용 프로그램은 두 개의 개별 Node 응용 프로그램으로 구성됩니다.

  1. 첫 번째는 RESTful API를 사용하여 웹 페이지를 주는 웹 서비스입니다. 

      - 사용자가 보관하려는 사이트의 URL을 받을수 있습니다.

      - POST request를 사용하여 제출 된 URL을 컴퓨터의 단일 파일에 저장합니다.

  2. 두 번째는 해당 파일에서 URL 목록을 읽고 인터넷에서 해당 URL로 지정된 페이지를 가져와 각 웹 페이지를 컴퓨터의 파일로 저장합니다.

      - [cron]을 사용하여이 두 번째 앱이 일정에 따라 실행되도록 구성합니다.

## What's in this repo

위에서 언급 한 두 개의 Node 애플리케이션은 각각 `web/`와 `workers/`에 있습니다. `test`와 `stubs`에는 Mocha 테스트와 관련된 코드가 들어 있습니다.

애플리케이션이 처음 실행될 때 생성되는 `archives` 폴더에는 웹 애플리케이션과 worker 애플리케이션이 상호 작용하는 파일이 들어 있습니다.

폴더가 생성되면 두 개의 파일이 보일 것입니다.

  - `archives/sites.txt`: 웹 응용 프로그램이 이 파일에 URL을 추가하며 worker 응용 프로그램은 실행될 때마다 목록을 읽습니다.

  -  `archives/sites/`: worker 응용 프로그램이 이 디렉토리에 파일을 추가하면 웹 응용 프로그램에서 이 파일을 사용자에게 제공합니다.

## A few notes

  * HTTP 문서는 호스트에 CSS 및 JS 파일이 있다고 가정하기 때문에 Host가 아닌 다른 곳에서 열릴 때 종종 손상됩니다. 그것에 대해 걱정하지 마십시오.

  * 이 스프린트의 목표 중 하나는 module성에 대해 생각하는 것입니다. 즉, 편히 관리 할 수있는 덩어리들로 나누고 함수를 좀 더 추상화하여 광범위한 입력 요소를 받아 작업 할 수 있도록 하는것 입니다. 
  쉽게 유지 보수 가능하고 추상화 된 코드를 작성하는 것은 소프트웨어 엔지니어링에서 중요한 기술입니다.
  이를 위해 'helperl'파일이 제공되었습니다. 추상화 된 helper function에 가능한 한 많이 사용하여 request handler file을 깨끗하고 읽기 쉽고 관리하기 쉬운 상태로 유지하십시오.

  * 서버를 만들시 Node의 `http` 패키지를 사용하게 될 것입니다. `express`나 다른 프레임 워크를 사용하지 마십시오.

  * 이 스프린트의 주요 목적 중 하나는 비동기식 JavaScript를 작성하는 연습을 더 많이하게하는 것입니다. 
  이를 염두에두고 다양한 Node 패키지에있는 method의 동기 버전을 사용하지 마십시오.
  예를 들어, `fs` 패키지를 사용하는 동안 `fs.readFileSync`가 아닌 `fs.readFile`을 사용하십시오.

## Bare Minimum Requirements

  - 테스트가 통과되도록하십시오. (`npm test`를 이용한 테스트 실행)

      - 사용자가 이미 작성한 페이지를 제출하는 경우 해당 페이지의 아카이브 된 버전 또는 페이지가 아직 로드되지 않은 경우`loading.html`로 자동 리디렉션해야합니다

      - `workers/htmlfetcher.js`에서 `helpers/archive-helpers.js`에 있는 코드를 사용하여 코드가 실행되면 파일을 다운로드 한 다음 종료하십시오.

          - 다운로드가 오랜 시간이 걸리면 `downloadUrls` helper에 대한 테스트가 잘못된 방식으로 fail될수 있습니다. 이 문제가 발생하면 test 대기 시간을 길게 늘리십시오.

          - 이 테스트에서는 서버가 들어오는 JSON 데이터를 handle하고 return하지만 브라우저의 네이티브 form 처리는 JSON 대신 form encoding을 사용합니다. jQuery를 사용하여 클라이언트에서 JSON을 보내게 하거나 form에서 인코딩 된 데이터를 보내도록 테스트를 수정할 수 있습니다.

  - [cron]을 사용하여 매분마다 위의 스크립트를 실행하십시오. 유의 사항:

      - crontab에서 실행할 때 `console.log`는 나타나지 않습니다. 그러니 파일에 로깅 메시지를 써주세요.

      - `crontab`에 있는 파일이나 스크립트에 대한 경로는 절대적(absolute) 경로(path)여야 합니다.

          - Absolute Path: `/Users/UserName/file.html`

          - Relative Path: `./nearby_file.html`

          - **Note**: 대부분의 시스템은 호스트 특정 적이 아닌 절대 경로를 작성하는 수단을 제공합니다. 즉, URL을 생성하는 데 도움이되도록 로컬 시스템에서 정보를 동적으로 가져올 수 있습니다. 따라서 한 호스트에서 다른 호스트로 응용 프로그램을 이동할 때 편집 할 필요가없는 코드를 작성할 수 있습니다. 프로덕션 응용 프로그램을 개발할 때 이 방법을 사용하는 것이 좋습니다.

      - `helpers/archive-helpers` function을 callback을 받아 들이기 보다는 Promise를 반환하도록 변경하십시오

      - 적절한 곳에 빛나는 새로운 `archive-helpers`를 사용하십시오.

    **Note**: Bluebird는 이미 이 repo에 포함되어 있습니다.

### Tests

- `test/test.js`에 2가지 이상의 새로운 테스트를 작성하십시오. 이 테스트는 사용자가 앱이 예상대로 작동한다는 것에 확신을 줄수 있습니다.

## Advanced Content
저희 Advanced Content는 여러분이 하기에 벅찬 과제를 도움이나 서포트없이 해결해야 하는 부분입니다. 현업에서 중급 또는 상급 개발자가 혼자서 해결하는것과 같이요.

  - 앱에서 동일한 사이트의 여러 버전을 저장할 수 있도록 설정

  - 기본 페이지에 보관 한 사이트 링크 표시

### Redis를 사용하여 `archives/sites.txt`를 대처하세요.

과정의 뒷부분에서 Redis에 대해 더 많이 배우 겠지만, 지금은 Redis가 메모리 내 키-값 저장소라는 것을 알아야합니다. Redis 서버를 실행하고 `redis` Node.js 모듈을 사용하면 Node.js 코드 내부에서 Redis 서버를 읽고 쓸 수 있습니다. 이를 염두에두고 응용 프로그램을 리팩토링하여 텍스트 파일이 아닌 Redis 서버에서 사이트 URL을 읽고 쓰도록 할 것입니다.

  - `redirect-server`와 `redis-cli` 명령을 `brew install redis` 명령으로 컴퓨터에 설치하십시오.

  - `redis-server` 명령을 실행하여 Redis 서버를 시작하십시오

  - 다른 터미널 창에서 `redis-cli` 명령으로 실행중인 Redis 서버에 연결하십시오

  - Redis CLI 내부에서 `SET` 및 `GET` 키를 사용하는 방법을 연구하십시오.

      - `flushall` 명령을 실행하여 CLI 내에서 실행중인 Redis 서버의 내용을 지울 수 있습니다.

  - npm을 사용하여 (가장 널리 사용되는) JavaScript Redis 클라이언트를 `npm install - save redis`로 설치하십시오

  - JavaScript Redis 클라이언트를 사용하여 JavaScript 내부에서 Redis 서버에 연결, 읽고 쓰는 방법에 대해 알아보십시오.

  - Web Historian app을 리팩토링하여 `archive/sites.txt`가 아닌 실행중인 redis 서버와 상호 작용하십시오.

## Helpful Links

- [URI Parsing with Javascript]
- [A Visual Explanation of SQL Joins]
- [Linux Crontab: 15 Awesome Cron Job Examples]
- [A Conjurer's Guide to Promises]
- [Promise cookbook]

[cron]:http://benr75.com/pages/using_crontab_mac_os_x_unix_linux
[A Visual Explanation of SQL Joins]:http://blog.codinghorror.com/a-visual-explanation-of-sql-joins/
[Linux Crontab: 15 Awesome Cron Job Examples]:http://www.thegeekstuff.com/2009/06/15-practical-crontab-examples/
[A Conjurer's Guide to Promises]:https://www.youtube.com/watch?v=OU7WuVGSuZw&feature=youtu.be
[Promise cookbook]:https://github.com/mattdesl/promise-cookbook
[URI Parsing with Javascript]:https://gist.github.com/jlong/2428561
[redis]:https://redis.io
[JavaScript Redis Client]:https://github.com/NodeRedis/node_redis
