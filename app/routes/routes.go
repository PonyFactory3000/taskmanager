// GENERATED CODE - DO NOT EDIT
// This file provides a way of creating URL's based on all the actions
// found in all the controllers.
package routes

import "github.com/revel/revel"


type tStatic struct {}
var Static tStatic


func (_ tStatic) Serve(
		prefix string,
		filepath string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "prefix", prefix)
	revel.Unbind(args, "filepath", filepath)
	return revel.MainRouter.Reverse("Static.Serve", args).URL
}

func (_ tStatic) ServeDir(
		prefix string,
		filepath string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "prefix", prefix)
	revel.Unbind(args, "filepath", filepath)
	return revel.MainRouter.Reverse("Static.ServeDir", args).URL
}

func (_ tStatic) ServeModule(
		moduleName string,
		prefix string,
		filepath string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "moduleName", moduleName)
	revel.Unbind(args, "prefix", prefix)
	revel.Unbind(args, "filepath", filepath)
	return revel.MainRouter.Reverse("Static.ServeModule", args).URL
}

func (_ tStatic) ServeModuleDir(
		moduleName string,
		prefix string,
		filepath string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "moduleName", moduleName)
	revel.Unbind(args, "prefix", prefix)
	revel.Unbind(args, "filepath", filepath)
	return revel.MainRouter.Reverse("Static.ServeModuleDir", args).URL
}


type tTestRunner struct {}
var TestRunner tTestRunner


func (_ tTestRunner) Index(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("TestRunner.Index", args).URL
}

func (_ tTestRunner) Suite(
		suite string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "suite", suite)
	return revel.MainRouter.Reverse("TestRunner.Suite", args).URL
}

func (_ tTestRunner) Run(
		suite string,
		test string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "suite", suite)
	revel.Unbind(args, "test", test)
	return revel.MainRouter.Reverse("TestRunner.Run", args).URL
}

func (_ tTestRunner) List(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("TestRunner.List", args).URL
}


type tApp struct {}
var App tApp


func (_ tApp) Index(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("App.Index", args).URL
}


type tCProject struct {}
var CProject tCProject


func (_ tCProject) BdConnOpen(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CProject.BdConnOpen", args).URL
}

func (_ tCProject) BdConnClose(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CProject.BdConnClose", args).URL
}

func (_ tCProject) GetAll(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CProject.GetAll", args).URL
}

func (_ tCProject) Add(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CProject.Add", args).URL
}

func (_ tCProject) Change(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CProject.Change", args).URL
}

func (_ tCProject) Delete(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CProject.Delete", args).URL
}


type tCTask struct {}
var CTask tCTask


func (_ tCTask) BdConnOpen(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CTask.BdConnOpen", args).URL
}

func (_ tCTask) BdConnClose(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CTask.BdConnClose", args).URL
}

func (_ tCTask) GetTaskStatusList(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CTask.GetTaskStatusList", args).URL
}

func (_ tCTask) GetAll(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CTask.GetAll", args).URL
}

func (_ tCTask) Add(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CTask.Add", args).URL
}

func (_ tCTask) Change(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CTask.Change", args).URL
}

func (_ tCTask) Delete(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("CTask.Delete", args).URL
}


