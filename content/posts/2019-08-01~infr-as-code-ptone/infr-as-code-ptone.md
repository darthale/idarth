---
title: Infrastructure as Code - part I
subtitle: A first step towards DevOps
slug: /infr-as-code-ptone
date: 2019-08-01
cover:
  img: infr-as-code-ptone-cover.jpg
tags:
  - DevOps
  - Terraform
  - Infrastructure as Code
  - AWS
showToc: true
---

## Intro

In 2011 when I started approaching software, the world was a different place than the one we know now.

At the time I was working on Web Services, Web App, RESTFul and SOAP API deployed on a very basic and simple stack: a relational database (usually SQLServer or PostgreSQL) and a bunch of physical machines with Windows Server and Apache Tomcat running on top of those. These were the main components, surely the IT department was handling other parts of the puzzle, but my realm of knowledge was limited to these and it was everything I needed to know to make my code work (or sort of).

The IT department (or system administrators as they liked to be called) were responsible for the whole infrastructure: adding new machines, patching, reboots, networking, upgrading, etc. We, developers, had to take care of the application layer and we didn’t have a say in any of the above mentioned tasks.

One of my most recent project (in 2018) involved something like: AWS API Gateway, Lambda functions, SQS queues, ECR repo, ECS, DynamoDB, S3, Athena, VPC, AutoScaling and I think that was about it.

As you may have noticed, the stack of services grew a lot and with it the complexity of handling everything. The developers perception and the awareness of knowing the nitty-gritty of every single service also changed: the application layer and the infrastructure one became very close, the closest they have been. Writing code without having a very good grasp of the services running your code is hard/almost impossible these days.

The sys admins role as we knew it faded away, the software engineers had to deal with infrastructure as much as they deal with code, and the next inevitable step turned into reality: infrastructure became code and code became infrastructure.

This post doesn’t want to describe the rise of services heterogeneity and the reasons behind (i.e the cloud), but it talks through the “whys” and “hows” we shifted towards infrastructure as code. The first part of this blog introduces the problem and different approaches seen in previous experiences, the second part goes into more details about the pros of infrastructure as code and it uses some code samples taken from some previous projects to discuss the basis using a tool called Terraform.

## Problem Statement 

I had the fortune of working at different companies with different setup and this made me realise what kind of approach was working better than others. The different approaches below provide a short summary of what I experienced and which kind of downsides each of those has.

### Approach A – File a ticket to the IT dept

You, developer, need a new VM where to host your app or a piece of it. You file a ticket to a queue and a guy on the other side, who doesn’t know anything about your application, picks up the ticket and provisions the VM. This approach usually comes with: slow responses (or at least slower than your expectations), misunderstandings (that comes from knowing just a little piece of the cake), fragmented responsibilities, communication overhead.

We have all been there at least once. This was painful, but the infrastructure wasn’t as dynamic, changes were quite rare and machines used to live for years.

### Approach B – File a ticket to the IT dept (Cloud version)

You finally made the transition to the cloud and you expect the release velocity to increase since your new service is just one click away. You still need to go through the IT gateway though and this time you need to iron out much more details in your ticket than you did before.

Most IT would not accept things like “I need a new IAM role for my app” but they would require details like: which services your role needs to assume, which services you role needs to interact with, authentication type, ip restriction, IAM to target, etc. If you add to this the variety of components you have on the cloud (as we mentioned in the introduction) and their life cycle (much shorter than the VMs mentioned in Approach A), you realise that the expected velocity actually is not there anymore. You also clearly compromise elasticity that you’d get with a cloud environment.

The downsides of this approach are even more evident during the initial phase of a project when you are trying out things and you don’t really know what your software needs. All the benefits of the cloud are lost.

### Approach C – No more IT dept

In this last approach you are handed over a cloud account: it’s totally up to you and your team what happen there. Velocity and elasticity are under your control.

You get started by creating a bunch of S3 buckets, a couple of VPC with networking rules, some EC2 instances and few IAM roles. The infrastructure after some tests works properly and you decide to move from a prototyping version to a stage one (or even production). You replicate the infrastructure over a new account (or the same one, but with different services name), [you put more cowbell](https://www.youtube.com/watch?v=cVsQLlk-T0s) here and there, you test again and..nothing works.

![More Cowbell](/cowbell.jpeg)

You did something slightly different while creating new services, you don’t have a clear history to understand where you messed up and you need to compare components one by one. Some time later (after a manual tiring process) you manage to find the right spot, you fix the issue and you are happy again with your infrastructure. The day after your team mate mentions in the stand-up that she will be including in the new environment some changes she had ready and tested in the prototype version. You start panicking, asking yourself whether those changes will break your precious work and you don’t feel confident about any new amendments.

This process could go on and on forever, maybe under different circumstances i.e: quickly rollback changes to production infrastructure (look for a manual change that happened somewhere at some point), add more instances to support the increasing traffic (manual provisioning new services in production), remove unused expensive servers making sure your software stays up and running with no headaches.

Velocity and elasticity are still far away from you.


## API on the horizon

Every of the approaches encountered came with some cons and, to make it more clear, the cons were not the IT departments, but a mix of:

* trying to adapt old processes to a new set of problems
* considering the application layer as totally independent from the infrastructure one


>Luckily the cloud environment is mainly API-driven. Why should we rely just on fancy-ish web interfaces to provision new infrastructure when we also have access to programmatic calls?

>(https://www.hashicorp.com/resources/what-is-infrastructure-as-code)