import groovy.json.JsonSlurper;

pipeline {
  agent any

  triggers {
    GenericTrigger(
      // 构建标题
      causeString: 'Triggered building qm-vnit in $ref',
      // 定义变量
      genericVariables: [
        [ key: 'ref', value: '$.ref', regexpFilter: 'refs/heads/' ],
        [ key: 'commit_message', value: '$.head_commit.message' ],
        [ key: 'modified', value: '$head_commit.modified' ],
      ],
      // 与 git webhook 中定义的 payload-url 一样
      token: 'qm-vnit',
      // 要匹配的内容
      regexpFilterText: '$ref;$ref;$commit_message',
      // 匹配的正则表达四
      regexpFilterExpression: '^preview;' + BRANCH_NAME + ';build ',
      printContributedVariables: true,
      // 是否打印 webhook 请求返回的 response body
      printPostContent: true,
      slientResponse: false,
    )
  }

  stages {
    stage ('output variables defined by generic-webhook-trigger plugin') {
      steps {
        script {
          println("ref: ${ref}");

          println("commit_message: ${commit_message}");

          println("modified: ${modified}");
        }
      }
    }

    stage ('declare hasInstall variables') {
      steps {
        script {
          def json = new JsonSlurper();
          def modifiedFiles = json.parseText(modified);
          def hasInstall = false;

          for (file in modifiedFiles) {
            if (file.contains('package.json')) {
              hasInstall = true;
              break;
            }
          }
          println(hasInstall);
          env.hasInstall = true;
        }
      }
    }

    stage ('building') {
      steps {
        script {
          def dt = new Date();
          def timestamp = dt.toString();

          dingtalk(
            robot: '4ca66784-8955-4dd2-aa78-8294f71cbaac',
            type: 'text',
            text: [
              "qm-vnit is building...",
              "${GIT_COMMIT}",
              "branch name: ${GIT_BRANCH}",
              "build start at ${timestamp}",
            ],
            at: [
              "${GIT_COMMITTER_NAME}",
            ]
          );

          '''
            if test [ "${env.hasInstall}" == true ];
              then
                yarn install;
            fi

            npm run build;

            rm -rf /usr/share/nginx/www;

            mv ./build /usr/share/nginx/www;
          '''
        }
      }
    }
  }

  post {
    success {
      script {
        def dt = new Date();
        def timestamp = dt.toString();

        dingtalk(
          robot: '4ca66784-8955-4dd2-aa78-8294f71cbaac',
          type: 'text',
          text: [
            "qm-vnit is build successed",
            "${GIT_COMMIT}",
            "branch name: ${GIT_BRANCH}",
            "build start at ${timestamp}",
          ],
          at: [
            "${GIT_COMMITTER_NAME}",
          ]
        );
      }
    }

    failure {
      script {
        def dt = new Date();
        def timestamp = dt.toString();

        dingtalk(
          robot: '4ca66784-8955-4dd2-aa78-8294f71cbaac',
          type: 'text',
          text: [
            "qm-vnit is build failed",
            "${GIT_COMMIT}",
            "branch name: ${GIT_BRANCH}",
            "build start at ${timestamp}",
          ],
          at: [
            "${GIT_COMMITTER_NAME}",
          ]
        );
      }
    }
  }
}
