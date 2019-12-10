---
title: The importance of company culture
subtitle: How different environments can affect you
slug: /company-culture
date: 2019-12-03
cover:
  img: planets.jpg
tags:
  - Company culture
  - Non tech
showToc: true
---

## Intro

I have never realised how important is being part of a company with a good culture, or with a culture that is in line with yours, until I started working for one whose culture clashed with mine.

This could easily fall into the list of things that either you don't give particular attention to or you don't care about until you lose them. 

It is hard or even impossible (at least for me) gather information about company culture during the interview process. Even if your interviewer says that they have a good culture, what he's good for him might not be for you. 

This is not going to be a technical post as you may have already guessed. I have never thought I would find myself writing about culture, but this topic has been stressing me for quite a while now and I wanted to share my experience. 

All of my words below might sound trivial and obvious, but working in an environment that shares your same principles is important, much more important than working with the latest cutting-edge technologies or frameworks. 


## Why the right culture is important

Someone once said: you are the average of the 5 people you spend the most time with. Where do you spend most of your awake time? At the office. Combining the two stamentents leads to: you are the average of the 5 people you spend the most time with, so the people that surround you at work. 

One might question the first saying, but if you dig deep, you could end up finding that you surround yourself with people that you like, mainly because you have something in common with them. 

The culture of a company is dictated by the people and it starts with the people in more senior positions. They are responsible for making sure the culture is shaped and transferred to every area of the company. Once the culture is set and spread, it's really hard to make an effort to change it to something different. 

And this could be very good, but also very bad if your company has the wrong culture.

If the people in a company are the foundation of its culture and if you are the average of a subset of these people, the next question is: how would you feel when you are surrounded by someone that you don't have anything in common with? Or more simply, how would you feel when you are surrounded by a culture that is not in line with yours? The answer to these questions is obvious. 

Being amongst people that are driven by the same principles, that are motivated by the same things, that thrive in the same environment, that share the same values, make a tremendous difference. When you are around these people, then you are in a place with the right culture for you.  
 
I can give a concrete example of what I'm trying to describe here and it comes from a real experience. 

I like being able to deliver the piece of work I'm tasked with. If there are blockers that need to be removed, external dependencies or responsibilities that are not mine, I would do whatever is possible to overcome those blockers and take on more responsibilities, in order to deliver. Recently, I have worked in an environment where this kind of attitude and behaviour was really rare amongst people and it was not well perceived overall. 90% of the people only cared about their little garden and completely ignored the possibility to do something outside their area of expertise. Initially, this was upsetting me and the constant thought I had was "why is this guy acting like this? This can't be right". As I started to collaborate with more colleagues, I found this repeating pattern and whilst I was still upset, I started figuring out we were not driven by the very same principles. 

This example shows that when you collaborate with people, you'd expect them to follow a pattern that you consider righteous and when this doesn't happen, you are left somewhat confused and puzzled. 
If this feeling keeps repeating over and over, then you should start considering whether the environment around you is the right one or not. 

## Find what drives you

You don't realise overnight if you ended up in the right environment. It takes time, effort and many introspections. Or at least it is what it took me.  
As you collaborate with more and more people, you start seeing the first traits of the culture that drives the company and you also start to ask yourself many questions.  Are these aspects ok with me? Are we sharing the same principles? What matter for me, does it matter for them too?  
At some point, as a result of this introspection, you may find yourself asking (probably) the most important question: what is driving me? 

>Try to come up with 3 to 5 principles that define yourself, that motivate you, that you would never give up. When you have found those truths, try to go back to your day-to-day and see if your colleagues share the same values. 

It was not as easy and immediate to find what drives me. 
I did not sit down in a room with a block of post-it and a pen to find these principles. I have rather used the opposite process: I listed out what was driving me mad in certain behaviours around me, feedback and reactions I observed over and over. In this way, I worked out a group of pillars that define me quite well. 

### Goals

I thrive in an environment with clear goals, I struggle when none are set. 
Defining long-term goals and breaking these down in mid/short-term objectives is essential for me. 
This helps to measure mine and my team's progress towards the set targets. It gives me a sense of how good or bad I'm doing and what or where I should focus my attention next.  It also defines the purpose of my efforts. 

I'm lost when there are no goals, I struggle with people that refuse to set clear objectives. 

### Ownership

I am much more motivated when I work on something that I feel mine. I would go to the moon and back to find solutions and fix problems to make it work. 

I thrive when people around me share this feeling, but I struggle to understand and get along with someone that thinks "no, that is not my job".  I go the extra mile(s) when I feel a sense of ownership, at the same time I become demotivated and sad if the project leader or my collaborators do not share this value.

### Actions

Through decisions making and actions you move closer to reach your goals. [Faffing around](https://www.urbandictionary.com/define.php?term=faffing), endless researching or studying are against my approach. 

I firmly believe in acting-failing-learning. I struggle when I am amongst people that fill their days with countless meetings and endless chats. I prefer seeing actions and progresses, I love listening to lessons learned.

### Dive deep


## Can you change the culture? 

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
