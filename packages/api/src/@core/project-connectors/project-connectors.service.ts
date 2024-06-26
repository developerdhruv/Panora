import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoggerService } from '../logger/logger.service';
import { v4 as uuidv4 } from 'uuid';
import { handleServiceError } from '@@core/utils/errors';
import { TypeCustom } from './project-connectors.controller';

@Injectable()
export class ProjectConnectorsService {
  constructor(private prisma: PrismaService, private logger: LoggerService) {
    this.logger.setContext(ProjectConnectorsService.name);
  }

  // TODO: create a function that accepts a "vertical_connector" and insert it inside the table for all projects setting to true by default
  // it would be used when a new connector is built and needs to be insert inside our tbale
  async updateProjectConnectors(
    column: string,
    status: boolean,
    id_project: string,
  ) {
    try {
      const existingPConnectors =
        await this.prisma.project_connectors.findFirst({
          where: {
            id_project: id_project,
          },
        });

      if (!existingPConnectors) {
        throw new Error(
          `No project connector entry found for project ${id_project}`,
        );
      }

      const updateData: any = {
        [column]: status, // Use computed property names to set the column dynamically
      };

      const res = await this.prisma.project_connectors.update({
        where: {
          id_project_connector: existingPConnectors.id_project_connector,
        },
        data: updateData,
      });
      return res;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async createProjectConnectors(data: TypeCustom) {
    try {
      const updateData: any = {
        id_project_connector: uuidv4(),
        id_project: data.id_project,
        crm_hubspot: data.crm_hubspot,
        crm_zoho: data.crm_zoho,
        crm_zendesk: data.crm_zendesk,
        crm_pipedrive: data.crm_pipedrive,
        crm_attio: data.crm_attio,
        tcg_zendesk: data.tcg_zendesk,
        tcg_gorgias: data.tcg_gorgias,
        tcg_front: data.tcg_front,
        tcg_jira: data.tcg_jira,
        tcg_gitlab: data.tcg_gitlab,
      };

      const res = await this.prisma.project_connectors.create({
        data: updateData,
      });
      return res;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  async getConnectorsByProjectId(id_project: string) {
    try {
      const project = await this.prisma.projects.findFirst({
        where: {
          id_project,
        },
      });

      if (!project) {
        throw new NotFoundException('Project does not exist!');
      }

      const res = await this.prisma.project_connectors.findFirst({
        where: {
          id_project: id_project,
        },
      });
      if (!res) {
        throw new NotFoundException(
          'Connectors not found for current project!',
        );
      }
      return res;
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }
}
