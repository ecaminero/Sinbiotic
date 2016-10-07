using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Sinbiotic.DataAccess;

namespace Sinbiotic.Migrations
{
    [DbContext(typeof(DomainModelContext))]
    [Migration("20161003185048_testMySql")]
    partial class testMySql
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.0-rtm-21431");

            modelBuilder.Entity("Sinbiotic.Models.Dtos.Content", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Created");

                    b.Property<DateTime>("ExpiredDate");

                    b.Property<bool>("Global");

                    b.Property<string>("Image")
                        .IsRequired();

                    b.Property<DateTime>("StartedDate");

                    b.Property<string>("TextAlign")
                        .IsRequired();

                    b.Property<string>("Tittle")
                        .IsRequired();

                    b.Property<DateTime>("Updated");

                    b.Property<int>("UserID");

                    b.HasKey("Id");

                    b.ToTable("Content");
                });
        }
    }
}
