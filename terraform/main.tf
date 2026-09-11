terraform {

    required_providers {

        local = {

            source = "hashicorp/local"

            version = "2.5.1"

        }

    }

}
 
provider "local" {}
 
resource "local_file" "arquivo" {

    filename = "devops.txt"

    content = "Infraestrutura automatizada com Terraform"

}
 