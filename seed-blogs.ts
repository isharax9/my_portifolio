import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.blogPost.createMany({
    data: [
      {
        title: "The Ultimate Guide to CI/CD with Jenkins and AWS",
        slug: "ultimate-guide-cicd-jenkins-aws",
        excerpt: "Learn how to build scalable and automated deployment pipelines using Jenkins and AWS services like EC2 and S3.",
        content: `
## Introduction
Continuous Integration and Continuous Deployment (CI/CD) is the backbone of modern software development. In this guide, we'll explore how to set up a robust pipeline using **Jenkins** and **AWS**.

### Why Jenkins?
Jenkins is an open-source automation server that enables developers around the world to reliably build, test, and deploy their software.

### Setting up Jenkins on EC2
1. Launch an EC2 instance (Ubuntu).
2. Install Java.
3. Add the Jenkins repository and install Jenkins.
4. Configure security groups to allow traffic on port 8080.

### Creating your first pipeline
Use a \`Jenkinsfile\` to define your pipeline as code:
\`\`\`groovy
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building...'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
            }
        }
        stage('Deploy to AWS') {
            steps {
                echo 'Deploying...'
                // Add AWS CLI commands here
            }
        }
    }
}
\`\`\`

Conclusion
By automating deployments, your team can focus on what matters most: writing great code.
        `,
        tags: ["DevOps", "AWS", "Jenkins", "CI/CD"],
        status: "PUBLISHED",
        publishedAt: new Date("2024-05-15T10:00:00Z"),
      },
      {
        title: "Monitoring Distributed Systems with Datadog and Grafana",
        slug: "monitoring-distributed-systems-datadog-grafana",
        excerpt: "A deep dive into setting up comprehensive monitoring and observability for your cloud infrastructure.",
        content: `
## The Importance of Observability

In distributed systems, knowing what went wrong is just as important as fixing it. **Observability** provides the insights needed to troubleshoot effectively.

### Datadog vs Grafana

Both tools excel at monitoring, but they serve different purposes.
- **Datadog** is a fully managed service that offers out-of-the-box integrations and APM.
- **Grafana** (often paired with Prometheus and Loki) provides immense flexibility and open-source freedom.

### Setting up Grafana Loki for Logs
Loki is a horizontally-scalable, highly-available, multi-tenant log aggregation system inspired by Prometheus.

#### Steps:
1. Install Loki and Promtail.
2. Configure Promtail to scrape your application logs.
3. Add Loki as a data source in Grafana.
4. Build custom dashboards.

### Conclusion
A robust monitoring stack is non-negotiable for modern cloud architecture. Choose the tool that best fits your team's expertise and budget.
        `,
        tags: ["DevOps", "Monitoring", "Grafana", "Datadog", "Observability"],
        status: "PUBLISHED",
        publishedAt: new Date("2024-06-20T14:30:00Z"),
      }
    ],
  });

  console.log("Blogs inserted!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
