---
title: Infrastructure as Code - part II
subtitle: A first step towards DevOps
slug: /infr-as-code-pttwo
date: 2019-08-10
cover:
  img: planets.jpg
tags:
  - DevOps
  - Terraform
  - Infrastructure as Code
  - AWS
showToc: true
---

## Intro

We concluded the [last post]((/blog/infr-as-code-ptone))
talking about the situation where the dev team has to manage the whole infrastructure manually, with all associated problematics . We also hinted to a possible solution: instead of using fancy web interfaces to create and provision infrastructure why don’t we utilise the API that the cloud providers expose?

This post tries to: detail out the pros of the approach infrastructure as code (IaC) (and the cons of course), introduce a tool widely adopted in the area (https://www.terraform.io/) and show some code samples taken from a previous project to discuss the basic elements of the tool.

## A journey towards IaC

In the [previous post]((/blog/infr-as-code-ptone)) we described how the approach to infrastructure creation and provisioning changed over the years. We listed 3 different approaches that I encountered during my career, we tried to highlight where the main headaches were and how people tried to solve them as the world of software developed over the years.

The last approach presented the development team in charge of the application development and also in charge of infrastructure creation, provisioning, configuration, maintenance and evolution. As we explained, this approach came with the benefit of being able to control the whole project stack, but it also came with many factors that limited the velocity and elasticity we all expect from using the cloud.

To summarise, the main limiting factor was the manual process behind. Manual meant: error-prone, hardly traceable, poorly repeatable and slow.

In my time at [LiveRamp](https://liveramp.com/), I had the fortune of joining a company whose policy for the cloud infrastructure was to manage everything through Terraform. From a tiny piece of the puzzle, like an IAM policy, to the big services, like an EMR cluster, had to be managed through an infrastructure as code approach.

## Terraform everything

[Kamino](https://starwars.fandom.com/wiki/Kamino) (or later renamed Llama) was the project that myself and my fellow data scientist colleague were working on and it was also the first where we got to experiment IaC. The project was quite complex and had a wide variety of AWS services: trying to create every bit of the infrastructure in one go seemed harder than climb the Everest with no oxygen. We then decided to divide the components by area as: storage, compute, messages, containers, users, network and api and we started to tackle the smallest and easiest bits.

Since this post doesn’t want to be a guide on how to setup terraform, we are just going to cover some basic concepts that should help the reader understanding the benefits of using such tool. Another important note to make is that everything covered below concerns the terraform provider AWS, even though most of the concepts and basis are true for other providers.

### Basic snippet anatomy

The snippet below is responsible for creating a new bucket on Amazon S3.

```t
resource "aws_s3_bucket" "com-lr-eu-artifacts" {
  bucket = "${var.lambda_artifacts}-${var.appname}"
  acl    = "private"
  region = "${var.region}"

  tags = {
    Project = "${var.appname}-${var.env}"
    Team    = "DataScience_UK"
  }
}
```

There are some basic elements here that can be found in any snippet whilst you are creating new resources on your cloud provider:

* resource: this opens the block of code where you specify the details of what you want to create.
* aws_s3_bucket: this is the type of resource you want to create.
* com-lr-eu-artifacts: this is your resource local name. The name is used to refer to this resource from elsewhere in the same Terraform module, but has no significance outside of the scope of a module.


The resource type and name together serve as an identifier for a given resource and so must be unique within a module.
The code block between the **{ }** instead hosts the details of the resource type you are creating. In our case we have:

* bucket: indicates the name of the s3 bucket (we’ll come back on how the bucket actual value is filled).
* acl: indicates the type of access control list.
* region: the region where you want your bucket to be deployed.
* tags: used to tag your services in AWS.


Some of the details are mandatory and some not: if you miss any mandatory one, your IDE should highlight that, or else during the creation of the terraform plan you will see the error. Terraform documentation covers extensively the arguments of every resource (i.e: https://www.terraform.io/docs/providers/aws/r/s3_bucket.html) and it’s always a good idea to check out the service doc before diving into the creation of it.

There are a couple of things to point out here:

1. If you are used to leverage the web console to deal with resources, writing code to create those is not immediate. A technique I have used whilst I was beginning with this was: open the IDE on one side and open the web console on the other in order to understand what arguments were needed for the resource I was trying to create.
2. The construct ${var.SOME_NAME}: this opens up a new world.

>In Terraform you can use input variables, that you declare ahead (usually in a file called variables.tf), and you valorise during execution time. Input variables make your code reusable: you could have one that indicates the environment you are in, or the region, or the name of the app, etc. You don’t need to re-create pieces of infrastructure manually anymore this way, you can simply use different values for your variables.

Here is what your *variables.tf* might look like:

```t
variable "region" {}
variable "env" {}
variable "appname" {}
variable "name" {}

variable "country" {}

variable "state_bucket" {}
variable "state_file" {}

variable "lambda_artifacts" {}
variable "lambda_build_file" {}
variable "lambda_collect_file" {}
variable "lambda_deploy_file" {}
variable "lambda_deploy_worker_file" {}
variable "lambda_file_validator_file" {}
```

### Plan and Apply

Once you are happy with your code, it’s time to bring those changes to life. In order to do so, Terraform offers you the command terraform apply. The command has to be run in the same directory where your tf file(s) live: this will first calculate the execution plan. This plan describes which actions Terraform will take in order to change the infrastructure to match the code you wrote. After you visualise the plan (see below) you can decide whether you want to apply or not those changes.

```sh
An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # aws_s3_bucket.com-lr-eu-artifacts will be created
  + resource "aws_s3_bucket" "com-lr-eu-artifacts" {
      + acceleration_status         = (known after apply)
      + acl                         = "private"
      + arn                         = (known after apply)
      + bucket                      = "blog-lambda-artifacts-blog-bucket"
      + bucket_domain_name          = (known after apply)
      + bucket_regional_domain_name = (known after apply)
      + force_destroy               = false
      + hosted_zone_id              = (known after apply)
      + id                          = (known after apply)
      + region                      = "eu-west-1"
      + request_payer               = (known after apply)
      + tags                        = {
          + "Project" = "blog-bucket-test"
          + "Team"    = "DataScience_UK"
        }
      + website_domain              = (known after apply)
      + website_endpoint            = (known after apply)

      + versioning {
          + enabled    = (known after apply)
          + mfa_delete = (known after apply)
        }
    }

Plan: 1 to add, 0 to change, 0 to destroy.

Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value:
```

>After you clicked on yes, Terraform creates the new components and writes/updates data in the file terrafom.tfstate. This file represents the current status of the infrastructure: the system leverages it to build the execution plan. Through the information the file, Terraform is able to understand what have to be created, updated or deleted.

### Team collaboration

As you may have already understood, the above mentioned terraform.tfstate becomes essential for team collaboration. Does each team member that work on the infrastructure need to have a local terraform.tfstate? Well, the answer is no, since modifying different versions of the same file will lead to conflicts.

>How is collaboration achieved then? Through shared remote state. Terraform allows to use a shared terraform.tfstate file (i.e: stored on S3) that is fetched whenever a new terraform apply is performed.

This allows team members to refer to the same version of the file and so to the same infrastructure. **It’s very important that during the setup of an existing Terraform project this file is not overridden: you need to be very careful in this phase, otherwise you’d compromise the whole infrastructure status**.

Another side of collaboration is achieved through the usual Git repo: every .tf file of your infrastructure should be versioned. This allows:

1. Team members to collaborate and contribute to the infrastructure.
2. History tracking: every small change you make is tracked, versioned and reviewed by the team.

### Modules

The last important aspect that we are addressing, it’s the concept of modules. The project structure below helps to understand better the point.

```sh
ls rootprj/
.terraform
_terraform-version
modules
production
staging
```

```sh
tree modules/
modules/
├── api.tf
├── autoscaling.tf
├── buckets.tf
├── ecs.tf
├── lambda.tf
├── main.tf
├── network.tf
├── outputs.tf
├── storage.tf
├── tasks
│   └── task_definition.json
└── variables.tf
```

```sh
tree staging/
staging/
├── Terrafile
├── _DS_Store
├── _terraform-version
├── clients.tf
├── ds.tf
├── main.tf
├── staging.tfvars
├── terraform.tfstate
├── terraform.tfstate.backup
└── variables.tf
```

Using a practical example: let’s say you have a staging environment where you tested your app and now you want to move everything to production. How would you go about this? Copy-pasting the whole set of .tf files under the directory prod/? That would work, but it would not be the smartest technique to adopt.

As you can see in the directories snapshot above, in addition to the staging and production directory, there’s a third one called modules. You want to store here all the components that are meant to be reused across environments. When you want to leverage this module in one of your environment is just a matter of:

```sh
head staging/main.tf

terraform {
  backend s3 {}
}

data "terraform_remote_state" "state" {
  backend = "s3"

  config {
    bucket = "${var.state_bucket}"
    key    = "${var.state_file}"
    region = "${var.region}"
  }
}

provider "aws" {
  region = "${var.region}"
}

module "infra" {
  source = "../modules"
}
```

Where **infra** is an identifier you can use throughout the Terraform code to refer to this module (i.e: infrastructure), **../modules** is the path where the modules code can be found.

>Modules are the key to write reusable, maintainable Terraform code. You can share modules across a project, or even across your company and you can use modules written by other people too.

## Wrapping up: the good (and the bad)

Generally speaking, infrastructure as code allows you and your team: to get closer to the velocity and elasticity of cloud adoption and to overcome all of those problems related to manual processes.

Other benefits are:

* The automation of creation, provisioning and deployment processes.
* Represent the state of your infrastructure through source files.
* Validate infrastructure changes through code reviews and tests
* Track bugs, speed up roll back, blue-green deploy are also easier


On the other side instead, you have to keep in mind:

* Learning curve is steep. It’s challenging, especially in the very beginning.
* Speed: creating components through point and click in the web interfaces is quicker. Having to code everything up is slower, especially initially when you don’t have libraries.
